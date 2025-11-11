// Initialisation de l’interface et des actions

function initUI() {
  renderCadre();
  renderActifsSelector(joueurs);

  // Chronomètre
  getEl("btnStartTimer").addEventListener("click", startTimer);
  getEl("btnPauseTimer").addEventListener("click", pauseTimer);
  getEl("btnResetTimer").addEventListener("click", resetTimer);

  // Score
  updateScoreBoard();

  // Journal
  getEl("btnVoirJournal").addEventListener("click", afficherJournalHTML);
  getEl("btnExportCSV").addEventListener("click", exporterJournalCSV);
  getEl("btnResetJournal").addEventListener("click", resetJournal);
}

document.addEventListener("DOMContentLoaded", initUI);
