import { API_URL } from "../../settings.js"
const URL = API_URL + "/members"
import { sanitizeStringWithTableRows } from "../../utils.js";

export async function initMembers(){
    const members = await fetch(URL).then((res) => res.json());
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

}