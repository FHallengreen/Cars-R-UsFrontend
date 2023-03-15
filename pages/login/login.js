// @ts-nocheck
import { API_URL } from "../../settings.js";
import { handleHttpErrors, encode } from "../../utils.js";
import {updateRestrictedLinks} from "../../auth.js"

export function initLogin() {
  const token = localStorage.getItem("token");
  
  document.getElementById("loginBtn").onclick = login;
}
const url = API_URL + "/auth/login";

async function login(evt) {
  document.getElementById("loading").classList.remove("d-none");
  document.getElementById("error").innerText = "";

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const dtoBody = { username, password };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json",

   },
    body: JSON.stringify(dtoBody),
  };

  try {
    // Make a POST request to the login endpoint
    const response = await fetch(API_URL + "/auth/login", options).then((res) =>
      handleHttpErrors(res));
    localStorage.setItem("username", response.username);
    const token = localStorage.setItem("token", response.token);
    localStorage.setItem("roles", JSON.stringify(response.roles));

    document.getElementById("login-id").style.display = "none";
    document.getElementById("logout-id").style.display = "block";
    window.router.navigate("");
    updateRestrictedLinks(true); // <-- Pass true to updateRestrictedLinks
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.textContent = "Logout";
    loginBtn.onclick = logout;

  } catch (err) {
    console.log(err.message)
  }
  finally {
    // hide the spinner
    document.getElementById("loading").classList.add("d-none");
  }
}

export function logout() {
  localStorage.clear();
  updateRestrictedLinks(false); // <-- Pass false to updateRestrictedLinks
  document.getElementById("login-id").style.display = "block";
  document.getElementById("logout-id").style.display = "none";
  window.router.navigate("");
}
