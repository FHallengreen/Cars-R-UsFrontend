import { API_URL } from "../../settings.js";
const URL = API_URL + "/members";
import { sanitizeStringWithTableRows } from "../../utils.js";
import { checkIfLoggedIn } from "../../auth.js";

export async function initMembers() {
  const token = localStorage.getItem("token");
  try {
    checkIfLoggedIn();
  } catch (error) {
    window.router.navigate("");
    console.log(error.message);
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  document.getElementById("loading").classList.remove("d-none");
  try {
    const members = await fetch(URL, options).then((res) => res.json());
    const tableRowsStr = members
      .map(
        (member) => `
          <tr>
          <td>${member.username}</td>
          <td>${member.email}</td>
          <td>${member.firstName}</td>
          <td>${member.ranking}</td>
      </tr>`
      )
      .join("");

    const okRows = sanitizeStringWithTableRows(tableRowsStr);
    document.getElementById("tbl-body").innerHTML = okRows;
  } catch (error) {
    console.log(error.message)
  } finally {
    // hide the spinner
    document.getElementById("loading").classList.add("d-none");
  }
}
