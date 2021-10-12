exports.seed = function (knex) {
  // return knex.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE");
  return knex("reservations").insert(
    [
      {
        first_name: "Rick",
        last_name: "Sanchez",
        mobile_number: "202-555-0164",
        reservation_date: "2020-12-31",
        reservation_time: "20:00:00",
        people: 6,
        created_at: "2020-12-10T08:30:32.326Z",
        updated_at: "2020-12-10T08:30:32.326Z"
      },
    ]
  )
};
