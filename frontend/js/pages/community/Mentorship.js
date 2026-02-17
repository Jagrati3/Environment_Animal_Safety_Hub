function sendRequest(name) {
  alert("✅ Mentor Request Sent to " + name + "!");
}

function postQuestion() {
  let question = document.getElementById("question").value;

  if (question.trim() === "") {
    alert("Please enter a question!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = "🌱 " + question;

  document.getElementById("forum-list").appendChild(li);
  document.getElementById("question").value = "";
}

/* Modal System */
function openModal() {
  document.getElementById("mentorModal").style.display = "block";
}

function closeModal() {
  document.getElementById("mentorModal").style.display = "none";
}

function matchMentor() {
  let interest = document.getElementById("interest").value;

  document.getElementById("matchResult").innerHTML =
    "✨ Best Mentor Matched for <b>" + interest + "</b>!";
}
