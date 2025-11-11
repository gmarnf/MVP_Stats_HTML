// Initialisation de l’interface et des actions

function initUI() {
  // Remplir l’UI principale
  renderCadre();
  renderActifsSelector(joueurs);

  // Charger valeurs de période/score depuis localStorage si dispo
  const savedPeriode = loadLocal("periodeValue", null);
  const savedScore = loadLocal("scoreValue", null);
  if (savedPeriode) getEl("periodeSelect").value = savedPeriode;
  if (savedScore) getEl("scoreInput").value = savedScore;

  // Écoute pour sauvegarder période/score
  getEl("periodeSelect").addEventListener("change", (e) => {
    saveLocal("periodeValue", e.target.value);
  });
  getEl("scoreInput").addEventListener("input", (e) => {
    saveLocal("scoreValue", e.target.value);
  });

  // Boutons journal
  const btnVoir = getEl("btnVoirJournal");
  const btnCSV = getEl("btnExportCSV");
  const btnReset = getEl("btnResetJournal");

  if (btnVoir) btnVoir.addEventListener("click", afficherJournalHTML);
  if (btnCSV) btnCSV.addEventListener("click", exporterJournalCSV);
  if (btnReset) btnReset.addEventListener("click", resetJournal);
}

document.addEventListener("DOMContentLoaded", initUI);
