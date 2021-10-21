exports.seed = function (knex) {
  return knex("tables").insert([
    {
      table_name: "Bar 1",
      capacity: 1,
    },
    {
      table_name: "Bar 2",
      capacity: 1,
    },
    {
      table_name: "3",
      capacity: 4,
    },
    {
      table_name: "4",
      capacity: 8,
    },
  ]);
};
