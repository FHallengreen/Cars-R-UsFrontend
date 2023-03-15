import { API_URL } from "../../settings.js"
const URL = API_URL + "/reservations/user/"
import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initListReservationsAll() {
  const username = localStorage.getItem("username")

    const reservations = await fetch(URL + username).then((res) => res.json());
    const tableRowsStr = reservations
      .map(
        (reservation) => `
          <tr>
          <td>${reservation.reservationId}</td>
          <td>${reservation.carId}</td>
          <td>${reservation.brand}</td>
          <td>${reservation.model}</td>
          <td>${reservation.rentalDate}</td>
      </tr>`
      )
      .join("");
  
    const okRows = sanitizeStringWithTableRows(tableRowsStr);
    document.getElementById("tablerows").innerHTML = okRows;

      }
