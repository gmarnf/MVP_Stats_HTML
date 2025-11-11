// Initialisation de l’interface et des actions

function initUI() {
  renderCadre();

  const btnVoir = getEl("btnVoirJournal");
  const btnCSV = getEl("btnExportCSV");

  if (btnVoir) btnVoir.addEventListener("click", afficherJournalHTML);
  if (btnCSV) btnCSV.addEventListener("click", exporterJournalCSV);
}

document.addEventListener("DOMContentLoaded", initUI);
