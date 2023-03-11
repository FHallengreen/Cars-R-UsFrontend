// @ts-nocheck
import { API_URL } from "../../settings.js";
//Add id to this URL to get a single user
const URL = `${API_URL}/cars`;
import { sanitizeStringWithTableRows } from "../../utils.js";

export function initFindEditCar() {
  document.getElementById("btn-fetch-car").onclick = fetchCar;
  document.getElementById("btn-submit-edited-car").onclick = editCar;
  document.getElementById("btn-delete-car").onclick = deleteCar;
}

export async function fetchCar() {
  const id = document.getElementById("car-id-input").value;

  try {
    if (id === "") {
      throw new Error("Please enter a car id");
    }

    const car = await fetch(`${URL}/${id}`).then((res) => res.json());

    if (car.car_id === undefined) {
      throw new Error(`No car found with ID ${id}`);
    }

    document.getElementById("car-id").value = car.car_id;
    document.getElementById("brand").value = car.brand;
    document.getElementById("model").value = car.model;
    document.getElementById("price-pr-day").value = car.pricePrDay;
    document.getElementById("best-discount").value = car.bestDiscount;
  } catch (error) {
    alert(error);
  }
  document.getElementById("car-id-input").value = "";
}

export async function editCar() {
  if (document.getElementById("car-id").value === "") {
    alert("Please enter a car id");
    return;
  }

  const car_id = document.getElementById("car-id").value;
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const pricePrDay = document.getElementById("price-pr-day").value;
  const bestDiscount = document.getElementById("best-discount").value;

  const car = {
    car_id: car_id,
    brand: brand,
    model: model,
    pricePrDay: pricePrDay,
    bestDiscount: bestDiscount,
  };

  try {
    await fetch(URL + "/" + car_id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
      .then((res) => res.json())
      .then((updatedCar) => {
        console.log("Car updated: ", car);
        alert("Car updated");
        document.getElementById("car-id").value = "";
        document.getElementById("brand").value = "";
        document.getElementById("model").value = "";
        document.getElementById("price-pr-day").value = "";
        document.getElementById("best-discount").value = "";
      });
  } catch (error) {
    alert(error);
  }
}

export async function deleteCar() {
  if (document.getElementById("car-id").value === "") {
    alert("Please enter a car id");
    return;
  }

  const car_id = document.getElementById("car-id").value;

  try {
    const response = await fetch(URL + "/" + car_id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("Car deleted: ", car_id);
      alert("Car deleted");
      document.getElementById("car-id").value = "";
      document.getElementById("brand").value = "";
      document.getElementById("model").value = "";
      document.getElementById("price-pr-day").value = "";
      document.getElementById("best-discount").value = "";
    } else {
      throw new Error(`Failed to delete car with ID ${car_id}`);
    }
  } catch (error) {
    alert(error);
  }
}
