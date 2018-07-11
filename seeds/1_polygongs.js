const polygongs = [
  {
    id: 1,
    polygong_url: "/something",
    polygong_data: JSON.stringify(
      [
      {
        shape: "triangle",
        speed: 50,
        direction: "+",
        tonal_center: "d_minor"
      }
    ]
  )

}]


exports.seed = function(knex, Promise) {
  return knex('polygongs').del()
  .then(() => {
    return knex.raw(
      "SELECT setval('polygongs_id_seq', 1, false);"
    );
  })
  .then(function () {
    return knex('polygongs').insert(polygongs);
  })
  .then(() => {
    return knex.raw(
      "SELECT setval('polygongs_id_seq', (SELECT MAX(id) FROM polygongs));"
    );
  });
};
