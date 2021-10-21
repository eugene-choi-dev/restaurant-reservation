import React from "react";
import { Link } from "react-router-dom";
import { updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom";

function Reservations({ reservations }) {
  const history = useHistory();
  const handleCancel = async (reservation_id) => {
    const body = { data: { status: "cancelled" } };
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      await updateReservationStatus(body, reservation_id);
      history.go(0);
    }
  };
  return reservations.map((reservation, index) => {
    const {
      reservation_id,
      first_name,
      last_name,
      mobile_number,
      reservation_time,
      people,
      status,
    } = reservation;
    return (
      !["cancelled", "finished"].includes(status) && (
        <div className="card my-3" key={index}>
          <div className="card-header">
            <b>Name:</b> {first_name} {last_name}
          </div>
          <div className="card-body">
            <p className="card-title">
              <b>Mobile Number:</b> {mobile_number}
            </p>
            <p className="card-text">
              <b>Time:</b> {reservation_time}
            </p>
            <p className="card-text">
              <b>People:</b> {people}
            </p>
            <p
              className="card-text"
              data-reservation-id-status={reservation_id}
            >
              <b>Status:</b> {status}
            </p>
            {status === "booked" && (
              <Link
                to={`/reservations/${reservation_id}/seat`}
                className="btn btn-dark mr-3"
              >
                Seat
              </Link>
            )}
            <Link to={`/reservations/${reservation_id}/edit`}>
              <button
                className="btn btn-secondary mr-3"
                disabled={status !== "booked" ? true : false}
              >
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              data-reservation-id-cancel={reservation_id}
              onClick={() => handleCancel(reservation_id)}
              disabled={status !== "booked" ? true : false}
            >
              Cancel
            </button>
          </div>
        </div>
      )
    );
  });
}

export default Reservations;
