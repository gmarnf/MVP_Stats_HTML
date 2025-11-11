// journal.js
// Journalisation, affichage HTML, export CSV, reset et gestion du score avec persistance locale

// Chargement initial depuis localStorage
let journalStats = loadLocal("journalStats", []);
let scoreEquipe = loadLocal("scoreEquipe", 0);
let scoreAdversaire = loadLocal("scoreAdversaire", 0);

/**
 * Ajoute une entrée au journal
 * @param {string} periode - ex: "Q1", "Q2", "OT"
 * @param {number|string} joueur - numéro du joueur ou "-" pour les événements d’équipe/adversaire
 * @param {string} statistique - libellé de l’événement
 * @param {string} score - score au format "xx-yy"
 * @param {Array<number>} joueursActifs - 5 numéros séparés par "-"
 */
function ajouterLog(periode, joueur, statistique, score, joueursActifs) {
  const entree = {
    heure: nowTime(),
    periode,
    joueur,
    statistique,
    score,
    joueursActifs: joueursActifs.join("-"),
  };
  journalStats.push(entree);
  saveLocal("journalStats", journalStats);
}

/**
 * Affiche le journal en HTML dans #journalContainer
 */
function afficherJournalHTML() {
  const container = getEl("journalContainer");
  if (!container) return;

  if (!journalStats.length) {
    container.innerHTML = `<p class="muted">Aucune entrée pour le moment.</p>`;
    return;
  }

  let html = `
    <table class="table journal-table">
      <thead>
        <tr>
          <th>Heure</th>
          <th>Période</th>
          <th>Joueur</th>
          <th>Statistique</th>
          <th>Score</th>
          <th>Joueurs actifs</th>
        </tr>
      </thead>
      <tbody>
  `;

  journalStats.forEach(entry => {
    html += `
      <tr>
        <td>${entry.heure}</td>
        <td>${entry.periode}</td>
        <td>${entry.joueur}</td>
        <td>${entry.statistique}</td>
        <td>${entry.score}</td>
        <td>${entry.joueursActifs}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
  `;

  container.innerHTML = html;
}

/**
 * Exporte le journal en CSV (séparateur ';')
 */
function exporterJournalCSV() {
  const header = "Heure;Période;Joueur;Statistique;Score;Joueurs actifs\n";
  const rows = journalStats.map(entry =>
    `${entry.heure};${entry.periode};${entry.joueur};${entry.statistique};${entry.score};${entry.joueursActifs}`
  ).join("\n");

  const csv = header + rows + "\n";
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "journal_stats.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Réinitialise le journal (vide et met à jour l’affichage)
 */
function resetJournal() {
  journalStats = [];
  saveLocal("journalStats", journalStats);
  const container = getEl("journalContainer");
  if (container) {
    container.innerHTML = `<p class="muted">Journal vidé.</p>`;
  }
}

/* ===========================
   Gestion du score (équipe/adversaire)
   =========================== */

/**
 * Met à jour l’affichage et persiste le score
 */
function updateScoreBoard() {
  const elEq = getEl("scoreEquipe");
  const elAdv = getEl("scoreAdversaire");
  if (elEq) elEq.textContent = scoreEquipe;
  if (elAdv) elAdv.textContent = scoreAdversaire;
  saveLocal("scoreEquipe", scoreEquipe);
  saveLocal("scoreAdversaire", scoreAdversaire);
}

/**
 * Ajoute des points à l’équipe et journalise l’événement
 * @param {number} points - 1, 2 ou 3
 */
function ajouterPointsEquipe(points) {
  scoreEquipe += points;
  updateScoreBoard();
  const periode = getPeriode();
  const actifs = getActifs();
  if (actifs.length === 5) {
    ajouterLog(periode, "-", `+${points} points équipe`, `${scoreEquipe}-${scoreAdversaire}`, actifs);
  }
}

/**
 * Ajoute des points à l’adversaire et journalise l’événement
 * @param {number} points - 1, 2 ou 3
 */
function ajouterPointsAdversaire(points) {
  scoreAdversaire += points;
  updateScoreBoard();
  const periode = getPeriode();
  const actifs = getActifs();
  if (actifs.length === 5) {
    ajouterLog(periode, "-", `+${points} points adversaire`, `${scoreEquipe}-${scoreAdversaire}`, actifs);
  }
}

/* ===========================
   Helpers d’initialisation (optionnel)
   =========================== */

/**
 * Initialise l’affichage du journal et du score au chargement
 */
function initJournalModule() {
  updateScoreBoard();
  // Ne pas afficher automatiquement le tableau du journal,
  // il sera affiché sur clic "Voir le journal en HTML"
}
