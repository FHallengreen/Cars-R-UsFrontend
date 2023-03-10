import { API_URL } from "../../settings.js"
const URL = API_URL + "/reservations"
import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initListReservationsAll() {

    const reservations = await fetch(URL).then((res) => res.json());
    const tableRowsStr = reservations
      .map(
        (reservation) => `
          <tr>
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
