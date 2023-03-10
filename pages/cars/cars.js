import { API_URL } from "../../settings.js"
const URL = API_URL + "/cars"
import { sanitizeStringWithTableRows } from "../../utils.js"

export async function initCars() {
    const cars = await fetch(URL)
    .then(res => res.json())
    const tableRowsStr = cars.map(car => `
        <tr>
        <td>${car.car_id}</td>
        <td>${car.brand}</td>
        <td>${car.model}</td>
        <td>${car.pricePrDay}</td>
        <td>${car.bestDiscount}</td>
    </tr>`).join("")

    const okRows = sanitizeStringWithTableRows(tableRowsStr);
    document.getElementById("table-rows").innerHTML = okRows;
}

