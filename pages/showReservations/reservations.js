import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";

const URL = API_URL + "/reservations/user/";

export async function initListReservationsAll() {
  document.getElementById("loading").classList.remove("d-none");
  try {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }
    const response = await fetch(URL + username, options);
    if (!response.ok) {
      throw new Error("Failed to fetch reservations data");
    }
    const reservations = await response.json();
    const tableRowsStr = reservations
      .map(
        (reservation) => `
          <tr>
            <td>${reservation.reservationId}</td>
            <td>${reservation.carId}</td>
            <td>${reservation.brand}</td>
            <td>${reservation.model}</td>
            <td>${reservation.rentalDate}</td>
          </tr>
        `
      )
      .join("");

    const okRows = sanitizeStringWithTableRows(tableRowsStr);
    document.getElementById("tablerows").innerHTML = okRows;
  } catch (error) {
    console.log(error.message);
  }
  finally {
    // hide the spinner
    document.getElementById("loading").classList.add("d-none");
  }
}