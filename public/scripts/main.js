function signOut() {
  localStorage.removeItem("token");
  fetch("/signOut", {
    method: "POST",
  }).then((res) => {
    window.location.href = "/login";
  });
  console.log("signOut");
}
function myFunction() {
  var x = document.getElementById("nav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
  const NavBtn = document.getElementById("NavBtn");
  if (NavBtn.className === "fa fa-bars") {
    NavBtn.className = "fa fa-times";
  } else if (NavBtn.className === "fa fa-times") {
    NavBtn.className = "fa fa-bars";
  }
  var y = document.getElementById("navRight");
  if (y.style.flexDirection === "row") {
    y.style.flexDirection = "column";
  } else if (y.style.flexDirection === "column") {
    y.style.flexDirection = "row";
  }
}
const password = document.getElementById("password");
const button = document.getElementById("submitBtn");
const passwordWarning = document.getElementById("passwordWarning");
password.addEventListener("keyup", function (event) {
  if (password.value.length < 8) {
    passwordWarning.classList.remove("warningBlack");
    passwordWarning.classList.add("warningRed");
    button.disabled = true;
  }
  if (password.value.length >= 8) {
    passwordWarning.classList.remove("warningRed");
    passwordWarning.classList.add("warningBlack");
    button.disabled = false;
  }
});
