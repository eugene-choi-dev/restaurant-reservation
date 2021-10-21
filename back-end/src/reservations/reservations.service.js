const knex = require("../db/connection");

function list(date, mobile_number) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .andWhere("status", "<>", "finished")
      .orderBy("reservation_time");
  } else {
    return search(mobile_number);
  }
}

function create(data) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = data;
  return knex("reservations")
    .insert({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    })
    .returning("*")
    .then((rows) => rows[0]);
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function updateReservation(data, reservation_id) {
  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = data;
  return knex("reservations")
    .where({ reservation_id })
    .update({
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    })
    .returning("*")
    .then((rows) => rows[0]);
}

function update({ status }, { reservation_id }) {
  return knex("reservations")
    .where({ reservation_id })
    .update({ status })
    .returning("*")
    .then((rows) => rows[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = { list, read, create, update, updateReservation };
