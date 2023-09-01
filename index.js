function validateLoginForm(event) {
  event.preventDefault(); // 防止表單提交

  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");

  var username = usernameInput.value;
  var password = passwordInput.value;

  if (username === "ADMIN" && password === "ADMIN"|| username === "Admin" && password === "Admin"|| username === "admin" && password === "admin") {
    window.location.href = "manager.html";
  } else {
    alert("無效的帳號或密碼！");
  }

  // 清空表單
  usernameInput.value = "";
  passwordInput.value = "";
}
