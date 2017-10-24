function circle(context){
  let circleMallet1 = new Mallet();
  circleMallet1.x = 240;
  circleMallet1.y = 0;

  context.beginPath();
  context.arc(0, 0, 240, 0, Math.PI * 2, false);
  context.lineWidth = 1;
  context.stroke();
  // mallet
  context.beginPath();
  context.arc(circleMallet1.x, circleMallet1.y, circleMallet1.r, 0, 2 * Math.PI, false);
  context.stroke();
  context.fill();
}
