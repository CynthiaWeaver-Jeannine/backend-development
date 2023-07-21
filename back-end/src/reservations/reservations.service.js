/** @format
 * Defines the database functions for the reservations resource.
 * @type {import('knex')}
 * @param {object} knex - The Knex connection object.
 * @returns {object} A Knex connection object.
 */

const knex = require("../db/connection");

function list() {
	return knex("reservations")
		.select("*")
		.whereIn("status", ["booked", "seated"])
		.orderBy("reservation_date", "asc")
		.orderBy("reservation_time", "asc");
}

function listByDate(reservation_date) {
	return knex("reservations")
		.select("*")
		.where({ reservation_date })
		.whereIn("status", ["booked", "seated"])
		.whereNot({ status: "finished" })
		.orderBy("reservation_time", "asc");
}

function listByDate(reservation_date) {
	return knex("reservations")
		.select("*")
		.where({ reservation_date })
		.whereIn("status", ["booked", "seated"])
		.whereNot({ status: "finished" })
		.orderBy("reservation_time", "asc");
}

function create(newReservation) {
	return knex("reservations")
		.insert(newReservation)
		.returning("*")
		.then((createdRecords) => createdRecords[0]);
}

function read(reservation_id) {
	return knex("reservations").select("*").where({ reservation_id }).first();
}

function update(updatedReservation) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id: updatedReservation.reservation_id })
		.update(updatedReservation, "*")
		.then((updatedRecords) => updatedRecords[0]);
}

function updateStatus(reservation_id, status) {
	return knex("reservations")
		.select("*")
		.where({ reservation_id })
		.update({ status }, "*")
		.then((updatedRecords) => updatedRecords[0]);
}

function search(mobile_number) {
	return knex("reservations")
		.whereRaw(
			"translate(mobile_number, '() -', '') like ?",
			`%${mobile_number.replace(/\D/g, "")}%`,
		)
		.orderBy("reservation_date");
}

module.exports = {
	list,
	listByDate,
	create,
	read,
	update,
	updateStatus,
	search,
};
