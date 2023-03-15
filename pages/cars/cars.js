import { API_URL } from "../../settings.js";
const URL = API_URL + "/cars";
import { sanitizeStringWithTableRows } from "../../utils.js";
import { checkIfLoggedIn } from "../../auth.js";

export async function initCars() {
  
  const token = localStorage.getItem("token");
  try {
    checkIfLoggedIn();
  } catch (error) {
    window.router.navigate("");
    console.log(error.message);
  }

  document.getElementById("loading").classList.remove("d-none");
  try{
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
        <td>${car.bestDiscount}</td>
    </tr>`
    )
    .join("");

  const okRows = sanitizeStringWithTableRows(tableRowsStr);
  document.getElementById("table-rows").innerHTML = okRows;
    }
    catch(error){
      console.log(error.message)
    }
    finally {
      // hide the spinner
      document.getElementById("loading").classList.add("d-none");
    }
}
