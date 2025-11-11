// calendrier.js
// Gestion des périodes, score manuel et joueurs actifs

function getPeriode() {
  return getEl("periodeSelect").value || "Q1";
}

function getScore() {
  return (getEl("scoreInput").value || "00-00").trim();
}

function getActifs() {
  const checked = document.querySelectorAll("#joueursActifs input[type='checkbox']:checked");
  const arr = Array.from(checked).map(cb => parseInt(cb.value, 10));
  return arr.length === 5 ? arr : [];
}

function renderActifsSelector(joueurs) {
  const container = getEl("joueursActifs");
  if (!container) return;

  container.innerHTML = joueurs.map(j => `
    <label class="actif-item">
      <input type="checkbox" value="${j.numero}" />
      #${j.numero} — ${j.nom}
    </label>
  `).join("");

  // Charger sélection depuis localStorage si disponible
  const saved = loadLocal("actifsSelection", []);
  if (Array.isArray(saved) && saved.length) {
    const inputs = container.querySelectorAll("input[type='checkbox']");
    inputs.forEach(inp => {
      inp.checked = saved.includes(parseInt(inp.value, 10));
    });
  }

  // Sauvegarder la sélection
  container.addEventListener("change", () => {
    const checked = Array.from(container.querySelectorAll("input:checked"))
      .map(cb => parseInt(cb.value, 10));
    saveLocal("actifsSelection", checked);
  });
}

/* ===========================
   Chronomètre
   =========================== */
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
