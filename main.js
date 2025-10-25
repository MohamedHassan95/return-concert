// Close navbar on nav-link click (in mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse); // Get Bootstrap collapse instance
    if (bsCollapse) {
      bsCollapse.hide();
    }
  });
});

// Auto activate nav-link on click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".nav-link")
      .forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");
  });
});

//Seemore Btn in about section to scroll to muscician section
document
  .querySelector(".scroll-to-musicians")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector("#musicians");
    const offset = 90;
    const topPosition =
      target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  });
//Seemore Btn in home section to scroll to about section
document
  .querySelector(".scroll-to-about")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector("#about");
    const offset = 90; // عدّل الرقم حسب ارتفاع الـ navbar

    const topPosition =
      target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: topPosition,
      behavior: "smooth",
    });
  });

// Auto update active nav-link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");

    if (window.scrollY < 300 && href === "#") {
      // Special case for home
      link.classList.add("active");
    } else if (current && href.includes(current)) {
      link.classList.add("active");
    }
  });
});

const spinner = document.getElementById("loading-spinner");

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  spinner.style.display = "block"; // ✅ إظهار اللودر

  const form = e.target;
  const formData = new FormData(form);
  const params = new URLSearchParams();

  for (const pair of formData.entries()) {
    params.append(pair[0], pair[1]);
  }

  fetch(
    "https://script.google.com/macros/s/AKfycbxl38KlMq9BZP4TFoXtVuDG4iQNyy383pdugwW8vh4owwOEtkMiIffqQwLw-uuDyvbN/exec",
    {
      method: "POST",
      body: params,
    }
  )
    .then((res) => {
      if (res.ok) {
        window.location.href = "thanks.html";
      } else {
        alert("حدث خطأ أثناء الإرسال، حاول مرة أخرى.");
      }
    })
    .catch((err) => {
      console.error(err);
      alert("فشل في الاتصال بالخادم.");
    })
    .finally(() => {
      spinner.style.display = "none"; // ✅ إخفاء اللودر بعد الانتهاء
    });
});
