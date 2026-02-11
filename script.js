

// Google Apps Script Web App
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyl6bD9p56Cjwah8_kpEp-FOplsp6QNmas1_qn0p-cI5c0x4hR2GHTK9LxbpJM2haeo/exec";
let guest = "";

const guestInput = document.getElementById("guestInput");
const guestNameSpan = document.getElementById("guestName");

guestInput.addEventListener("input", () => {
  guest = guestInput.value.trim();
  guestNameSpan.innerText = guest || "";
});


// Modal helpers
function showModal(title, text) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalText").innerText = text;
  document.getElementById("modal").classList.remove("hidden");
}
function closeModal() { document.getElementById("modal").classList.add("hidden"); }

// Disable buttons after click
function disableButtons() {
  document.getElementById("yesBtn").disabled = true;
  document.getElementById("noBtn").disabled = true;
  document.getElementById("yesBtn").style.opacity = "0.6";
  document.getElementById("noBtn").style.opacity = "0.6";
}

// Send RSVP with progress animation
function sendRSVP(choice) {
  const guestInput = document.getElementById("guestInput");
  guest = guestInput.value.trim();

  if (!guest) {
    showModal("تنبيه", "فضلاً أدخلي الاسم الكريم قبل تسجيل الرد");
    return;
  }

  const progress = document.getElementById("progress");
  const bar = progress.querySelector(".progress-bar-inner");

  progress.classList.add("active");
  bar.style.width = "0%";
  setTimeout(() => { bar.style.width = "100%"; }, 50);

  setTimeout(() => {
    const formData = new URLSearchParams();
    formData.append("guest", guest);
    formData.append("choice", choice);

    fetch(WEB_APP_URL, { method: "POST", body: formData })
      .then(() => {
        progress.classList.remove("active");
        showModal(
          "تم تسجيل ردك 🌿",
          `شكرًا لك ${guest}، تم تسجيل ردك: ${choice}`
        );
        disableButtons();
      })

      .catch(() => {
        progress.classList.remove("active");
        showModal("حدث خطأ", "لم نتمكن من تسجيل ردك، الرجاء المحاولة لاحقًا");
      });
  }, 2000);
}

// Button listeners
document.getElementById("yesBtn").addEventListener("click", () => sendRSVP("قبول"));
document.getElementById("noBtn").addEventListener("click", () => sendRSVP("اعتذار"));







