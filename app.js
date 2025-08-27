// Demo kullanıcı bilgisi
const VALID_USER = { username: "admin", password: "1234" };

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const msg = document.getElementById("msg");
  const showPwd = document.getElementById("showPwd");
  const rememberMe = document.getElementById("rememberMe");
  const capsMsg = document.getElementById("capsMsg");
  const loginBtn = document.getElementById("loginBtn");
  const card = document.getElementById("card");

  // 'Beni hatırla' - kullanıcı adını doldur
  const savedUser = localStorage.getItem("rememberUser");
  if (savedUser) {
    username.value = savedUser;
    rememberMe.checked = true;
  }

  // Şifreyi göster/gizle
  showPwd.addEventListener("change", () => {
    password.type = showPwd.checked ? "text" : "password";
  });

  // Caps Lock uyarısı
  const capsCheck = (e) => {
    const on = e.getModifierState && e.getModifierState("CapsLock");
    capsMsg.style.display = on ? "block" : "none";
  };
  password.addEventListener("keydown", capsCheck);
  password.addEventListener("keyup", capsCheck);

  // Giriş
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    msg.textContent = "";

    const u = username.value.trim();
    const p = password.value;

    // "Beni hatırla" yönetimi
    if (rememberMe.checked) {
      localStorage.setItem("rememberUser", u);
    } else {
      localStorage.removeItem("rememberUser");
    }

    // Basit doğrulama
    if (u === VALID_USER.username && p === VALID_USER.password) {
      sessionStorage.setItem("auth", "true");
      loginBtn.disabled = true;
      loginBtn.textContent = "Giriş yapılıyor...";
      window.location.assign("home.html");
    } else {
      msg.textContent = "Kullanıcı adı veya şifre yanlış!";
      // mini sarsma animasyonu
      card.classList.remove("shake");
      void card.offsetWidth; // reflow
      card.classList.add("shake");
    }
  });
});

