function signOut() {
  localStorage.removeItem("token");
  fetch("/signOut", {
    method: "POST",
  }).then((res) => {
    window.location.href = "/login";
  });
  console.log("signOut");
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
