export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function checkIfLoggedIn() {
  const token = localStorage.getItem("token");
  const roles = localStorage.getItem("roles");

  console.log("roles:", roles);

  if (token && roles) {
    const parsedRoles = JSON.parse(roles);

    console.log("parsedRoles:", parsedRoles);

    const isAdmin = parsedRoles.includes("ADMIN");
    const isUser = parsedRoles.includes("USER");

    console.log("isAdmin:", isAdmin);
    console.log("isUser:", isUser);

    document.getElementById("login-id").style.display = "none";
    document.getElementById("logout-id").style.display = "block";

    if (isAdmin) {
      console.log("User is admin");
      return { token, role: "ADMIN" };
    } else if (isUser) {
      console.log("User is user");
      return { token, role: "USER" };
    } else {
      console.log("User is anonymous");
      return { token, role: "anonymous" };
    }
  }

  document.getElementById("login-id").style.display = "block";
  document.getElementById("logout-id").style.display = "none";

  return { role: "anonymous" };
}

export function updateRestrictedLinks() {
  const { role } = checkIfLoggedIn();

  const adminLinks = document.querySelectorAll(".admin-link");
  adminLinks.forEach((link) => {
    if (link instanceof HTMLElement) {
      link.style.display = role.includes("ADMIN") ? "block" : "none";
    }
  });

  const userLinks = document.querySelectorAll(".user-link");
  userLinks.forEach((link) => {
    if (link instanceof HTMLElement) {
      link.style.display =
        role.includes("ADMIN") || role.includes("USER") ? "block" : "none";
    }
  });

  const anonymousLinks = document.querySelectorAll(".anonymous-link");
  anonymousLinks.forEach((link) => {
    if (link instanceof HTMLElement) {
      link.style.display = role === "anonymous" ? "block" : "none";
    }
  });
}
