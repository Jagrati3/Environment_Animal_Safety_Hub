document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".feedback-form");
  const popup = document.getElementById("feedbackPopup");
  const popupMsg = document.getElementById("feedbackPopupMessage");
  const closeBtn = document.getElementById("closePopupBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    popupMsg.textContent = name
      ? `Thank you, ${name}, for sharing your feedback with us!`
      : "Thank you for sharing your feedback with us!";

    popup.classList.remove("hidden");
    form.reset();
  });

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
});
