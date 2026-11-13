# PolyGong (2017): What the Code Actually Does

Source: this repo at commit `2d545d2`. Reference for the Mk2 rebuild (`../polyGongMk2`). It is not a spec.

PolyGong is a musical mobile in the browser: rotating shapes whose vertices strike gong tones as they pass. Everything below is read from the code. The purpose above is from the owner; it is not in the code.

## Stack

- Front end: AngularJS 1.6.5 + ui-router (CDN), jQuery, Tachyons, Font Awesome 4.7, Three.js (vendored, global), Tone.js 13 (vendored, global), clipboard.js.
- Back end: Express 4 on Node 8.2.1, Knex + Postgres, Heroku (`Procfile`, `heroku-postbuild` runs migrations).
- About 1,500 lines of app code. `Three.js` and `Tone.js` are vendored copies (~70k lines).

## Files that matter

| File | Role |
|------|------|
| `public/js/directives/gongbase.directive.js` | Everything: audio setup, Three.js scene, add/remove shapes, animation loop, restore from URL |
| `public/templates/gongbase.template.html` | UI: shape buttons, left panel (global), right panel (per shape), footer (share URL) |
| `public/js/classes/{circle,line,triangle,...}.js` | One class per shape, ~95% identical |
| `public/js/classes/poly.js` | Polygon geometry helper, SVG icon points |
| `public/js/classes/toneHelp.js` | Synth, drone, delay, LFO, limiter factories |
| `public/js/services/gongBuilderService.service.js` | Shape stack, rebuild shapes from saved data |
| `public/js/services/urlService.service.js` | GET/POST saved state |
| `routes/polygongs.js`, `migrations/`, `server.js` | Save/load API, one table |
| `helperService`, `toneService` | Dead code (not loaded by `index.html`) |

## Behavior

**Shapes.** Each shape is a Three.js group: a line outline plus a sprite "mallet" at each vertex. All shapes share the same center (0,0,0), default size 3, default speed 45. Mallet color changes with rotation.

**Rotation and hits.** Every animation frame, each shape rotates by `π / (3000 / speed)` radians. When the accumulated angle passes the next multiple of `2π / N`, the shape plays a note. The angle resets every full turn.

**Per-shape pitch** (`baseFreq × multiplier`, where `tone[i]` is an index into the active tone cluster):

| Shape | Sides (hits/turn) | Frequency |
|-------|-------------------|-----------|
| circle | 1 (by accident: `numbSides` is undefined, so it hits once per turn) | base × 0.5 × tone[10] |
| line | 2 | base × tone[2] |
| triangle | 3 | base × tone[8] |
| square | 4 | base × tone[6] |
| pentagon | 5 | base × 0.5 × tone[4] |
| hexagon | 6 | base × 0.5 × tone[2] |
| heptagon | 7 | base × 2 (ignores cluster) |

**Tone clusters** (just-intonation ratios; index 0 is a label):
- all: 16/15, 9/8, 6/5, 5/4, 4/3, 45/32, 3/2, 8/5, 5/3, 16/9, 15/8
- down: 16/9, 5/3, 8/5, 3/2, 45/32, 4/3, 5/4, 6/5, 9/8, 16/5 (probably a typo for 16/15), 1
- up: repeating 4/3, 3/2, 5/3, 9/8

**Audio graph.**
- Each shape gets its own `Tone.Synth` (sine; attack 0.03, decay 0.08, sustain 0.06, release 2) → Master.
- A master LFO (7 Hz, range ±Shimmy cents) is connected to every synth's detune. This is the vibrato.
- Drone: a sine oscillator at base/4 → Master. Starts at -42 dB.
- Master chain: PingPongDelay (0.2 s, feedback 0.5, wet = Bounce) → Limiter (-10 dB).

**Controls.**
- Left panel (global): Drone volume (-42..-6 dB), Bounce = delay wet (0..1), Shimmy = vibrato depth (0..100 cents), Base frequency (200/300/400 Hz), Tone cluster (all/down/up).
- Right panel (one row per shape): Speed (5..200), Scale (0.01..6), Volume (0.01..1.2).
- Header: add a shape; undo removes the last shape.
- Footer: "GET URL" saves state and shows a share link.

**Persistence.** `POST /polygongs` stores the JSON of every shape's `save()` under a UUID. Visiting `/:uuid` fetches it and rebuilds the shapes, scale, rotation, and global settings.

## Bugs and quirks (do not carry forward unless chosen)

- **Volume slider changes note length, not loudness.** `triggerAttackRelease(freq, volume × 0.02)`: the second argument is duration.
- Tone cluster radio does nothing live (`toneChooser` is empty). It is only read when a shape is created and on each frame through `rotate()`.
- Base frequency changes the drone but shapes only pick it up on the next frame through `rotate()`. That works, but by accident.
- The first move of each global slider is ignored (the `*Invoked` flags).
- Undo pops `scene.children` and `gongStack` separately. Nothing disconnects or disposes the synth, so it leaks.
- `save()` serializes live Tone.js objects (drone, delay, LFO) into the database.
- Restore mixes `data[0]` and `data[last]` for global settings, and compares the drone level to -36 when the default is -42.
- Speed depends on frame rate.
- The share URL host is hard-coded to `polygong.herokuapp.com`.

## Why it bogged down and drifted

Everything runs on the main thread: Angular digest on every slider change, Three.js rendering every frame, one Tone.js `Synth` node graph per shape, a `quaternion.onChange` color callback per shape per frame, and strike triggering from `requestAnimationFrame`. With more than two or three shapes the CPU maxed out.

Strike timing came from the render loop and JS timers, which are not a musical clock (millisecond resolution, skewed by rendering and garbage collection), so strikes drifted. Mk2 moves the musical clock and audio generation to Rust/WASM in an AudioWorklet.
