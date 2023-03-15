// @ts-nocheck
import { API_URL } from "../../settings.js";
import { sanitizeStringWithTableRows } from "../../utils.js";

const URL = API_URL + "/cars";
const reservationURL = API_URL + "/reservations";
const token = localStorage.getItem("token");

export async function initReservation() {
  getCars();
  document.getElementById("table-rows").onclick = setupReservationModal;
  document
    .getElementById("btn-reservation")
    .addEventListener("click", reserveCar);
}

export async function getCars() {
  document.getElementById("loading").classList.remove("d-none");
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const cars = await fetch(URL, options).then((res) => res.json());
    const tableRowsStr = cars
      .map(
        (car) => `
          <tr>
            <td>${car.car_id}</td>
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.pricePrDay}</td>
            <td>
              <button data-car-id="${car.car_id}" type="button" class="btn btn-sm btn-primary row-btn-details">Details</button>
            </td>
          </tr>`
      )
      .join("");

    const okRows = sanitizeStringWithTableRows(tableRowsStr);
    document.getElementById("table-rows").innerHTML = okRows;
  } catch (error) {
    console.log(error.message);
  } finally {
    // hide the spinner
    document.getElementById("loading").classList.add("d-none");
  }
}

async function setupReservationModal(evt) {
  const target = evt.target;
  if (!target.classList.contains("row-btn-details")) {
    return;
  }
  const carId = target.getAttribute("data-car-id");
  const carDetails = await getCarDetails(carId);
  showReservationModal(carDetails);
}

async function getCarDetails(carId) {
 
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const response = await fetch(`${URL}/${carId}`, options);
    const carDetails = await response.json();
    return carDetails;
  } catch (error) {
    console.log(error.message);
  }
}

function showReservationModal(carDetails) {
  const modalTitle = document.getElementById("reservation-modal-label");
  const carIdInput = document.getElementById("car-id");
  const reservationDateInput = document.getElementById("reservation-date");
  const usernameInput = document.getElementById("user-name");
  const username = localStorage.getItem("username");

  modalTitle.innerText = `Reserve ${carDetails.brand} ${carDetails.model}`;
  carIdInput.value = carDetails.car_id;
  reservationDateInput.value = "";
  usernameInput.value = username;

  const reservationModal = new bootstrap.Modal(
    document.getElementById("reservation-modal")
  );
  reservationModal.show();
  const reservationBtn = document.getElementById("btn-reservation");
  reservationBtn.onclick = async function () {
    reservationModal.hide();
  };
}

export async function reserveCar() {
  const carId = document.getElementById("car-id").value;
  const reservationDate = document.getElementById("reservation-date").value;
  const memberId = document.getElementById("user-name").value;

  const reservation = {
    memberId: memberId,
    carId: carId,
    rentalDate: reservationDate,
  };

  console.log(JSON.stringify(reservation));
  try {
    await fetch(reservationURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(reservation),
    });
  } catch (error) {
    console.log("An error occurred while reserving car.");
  }
  console.log("Reservation added successfully");
}
