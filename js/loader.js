// loader.js
// Initialisation de l’interface et des actions

function initUI() {
  // Affichage des cartes joueurs
  renderCadre();

  // Affichage des cases à cocher pour les joueurs actifs
  renderActifsSelector(joueurs);

  // Charger valeurs de période/score manuel depuis localStorage si dispo
  const savedPeriode = loadLocal("periodeValue", null);
  const savedScore = loadLocal("scoreValue", null);
  if (savedPeriode) getEl("periodeSelect").value = savedPeriode;
  if (savedScore) getEl("scoreInput").value = savedScore;

  // Sauvegarde automatique de la période et du score manuel
  getEl("periodeSelect").addEventListener("change", (e) => {
    saveLocal("periodeValue", e.target.value);
  });
  getEl("scoreInput").addEventListener("input", (e) => {
    saveLocal("scoreValue", e.target.value);
  });

  /* ===========================
     Chronomètre
     =========================== */
  getEl("btnStartTimer").addEventListener("click", startTimer);
  getEl("btnPauseTimer").addEventListener("click", pauseTimer);
  getEl("btnResetTimer").addEventListener("click", resetTimer);

  /* ===========================
     Score
     =========================== */
  updateScoreBoard();

  /* ===========================
     Journal
     =========================== */
  getEl("btnVoirJournal").addEventListener("click", afficherJournalHTML);
  getEl("btnExportCSV").addEventListener("click", exporterJournalCSV);
  getEl("btnResetJournal").addEventListener("click", resetJournal);
}

// Lancer l’initialisation après chargement du DOM
document.addEventListener("DOMContentLoaded", initUI);
