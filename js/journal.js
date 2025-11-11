// Journalisation et affichage

let journalStats = [];

/**
 * Ajoute une entrée au journal
 */
function ajouterLog(periode, joueur, statistique, score, joueursActifs) {
  const horodatage = nowTime();
  const entree = {
    heure: horodatage,
    periode,
    joueur,
    statistique,
    score,
    joueursActifs: joueursActifs.join("-"),
  };
  journalStats.push(entree);
}

/**
 * Affiche le journal en HTML
 */
function afficherJournalHTML() {
  const container = getEl("journalContainer");
  if (!container) return;

  let html = `
    <table class="table">
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
 * Exporte le journal en CSV
 */
function exporterJournalCSV() {
  let csv = "Heure;Période;Joueur;Statistique;Score;Joueurs actifs\n";
  journalStats.forEach(entry => {
    csv += `${entry.heure};${entry.periode};${entry.joueur};${entry.statistique};${entry.score};${entry.joueursActifs}\n`;
  });

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

// Variables de score
let scoreEquipe = loadLocal("scoreEquipe", 0);
let scoreAdversaire = loadLocal("scoreAdversaire", 0);

function updateScoreBoard() {
  getEl("scoreEquipe").textContent = scoreEquipe;
  getEl("scoreAdversaire").textContent = scoreAdversaire;
  saveLocal("scoreEquipe", scoreEquipe);
  saveLocal("scoreAdversaire", scoreAdversaire);
}

function ajouterPointsEquipe(points) {
  scoreEquipe += points;
  updateScoreBoard();
  const periode = getPeriode();
  const actifs = getActifs();
  if (actifs.length === 5) {
    ajouterLog(periode, "-", `+${points} points équipe`, `${scoreEquipe}-${scoreAdversaire}`, actifs);
  }
}

function ajouterPointsAdversaire(points) {
  scoreAdversaire += points;
  updateScoreBoard();
  const periode = getPeriode();
  const actifs = getActifs();
  if (actifs.length === 5) {
    ajouterLog(periode, "-", `+${points} points adversaire`, `${scoreEquipe}-${scoreAdversaire}`, actifs);
  }
}
