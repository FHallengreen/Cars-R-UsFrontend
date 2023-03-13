// @ts-nocheck
import { API_URL } from "../../settings.js";
import { handleHttpErrors, encode } from "../../utils.js";

const URL = `${API_URL}/members`;

export function initSignup() {
  document.getElementById("btn-submit-member").onclick = addMember;
}

function addMember() {
  const form = document.getElementById("form");
  const username = document.getElementById("input-username");
  const email = document.getElementById("input-email");
  const password = document.getElementById("input-password");
  const firstName = document.getElementById("input-firstname");
  const lastName = document.getElementById("input-lastname");
  const street = document.getElementById("input-street");
  const city = document.getElementById("input-city");
  const zip = document.getElementById("input-zip");
  const status = document.getElementById("status");
  const btnSubmit = document.getElementById("btn-submit-member");
  const gotoLogin = document.getElementById("goto-login");

  const member = {
    username: username.value,
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
    address: {
      street: street.value,
      city: city.value,
      zip: zip.value,
    },
  };

  btnSubmit.disabled = true;
  status.innerText = "Submitting...";

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  })
    .then(handleHttpErrors)
    .then(() => {
      status.innerText = "Sign up successful!";
      gotoLogin.style.display = "block";
      form.reset();
    })
    .catch((error) => {
      try {
        const errorMessage = JSON.parse(error.message);
        status.innerText = errorMessage.message;
      } catch (e) {
        status.innerText = error.message;
      }
    })
    .finally(() => {
      btnSubmit.disabled = false;
    });
}