// Gestion des périodes et score (simple helpers)

function getPeriode() {
  return getEl("periodeSelect").value || "Q1";
}

function getScore() {
  return (getEl("scoreInput").value || "00-00").trim();
}

function getActifs() {
  const raw = getEl("actifsInput").value || "";
  const arr = parseActifs(raw);
  return arr.length === 5 ? arr : [];
}

// Chronomètre
let timerInterval = null;
let remainingSeconds = 0;

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  const minutes = parseInt(getEl("quartDuration").value, 10) || 10;
  remainingSeconds = minutes * 60;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay();
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("Fin du quart-temps !");
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function resetTimer() {
  if (timerInterval) clearInterval(timerInterval);
  const minutes = parseInt(getEl("quartDuration").value, 10) || 10;
  remainingSeconds = minutes * 60;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  getEl("timerDisplay").textContent = `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}
