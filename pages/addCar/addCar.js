// @ts-nocheck

import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js";
//Add id to this URL to get a single user
const URL = `${API_URL}/cars`;
const token = localStorage.getItem("token");

export async function initAddCar(match) {
  document.getElementById("btn-submit-car").onclick = addCar;
}

export async function addCar() {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const pricePrDay = document.getElementById("price-pr-day").value;
  const bestDiscount = document.getElementById("best-discount").value;

  const car = {
    brand: brand,
    model: model,
    pricePrDay: pricePrDay,
    bestDiscount: bestDiscount,
  };

  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(car),
    });
    window.router.navigate("#/cars");
    displayCarAddedMessage()
  } catch (error) {
    console.log(error.message);
  }
}
