// Gestion des périodes, score et joueurs actifs

function getPeriode() {
  return getEl("periodeSelect").value || "Q1";
}

function getScore() {
  return (getEl("scoreInput").value || "00-00").trim();
}

// Version avec cases à cocher pour les 5 actifs
function getActifs() {
  const checked = document.querySelectorAll("#joueursActifs input[type='checkbox']:checked");
  const arr = Array.from(checked).map(cb => parseInt(cb.value, 10));
  return arr.length === 5 ? arr : [];
}

// Remplit la liste des cases à cocher des joueurs
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

  // Écoute changements pour sauvegarder
  container.addEventListener("change", () => {
    const checked = Array.from(container.querySelectorAll("input:checked"))
      .map(cb => parseInt(cb.value, 10));
    saveLocal("actifsSelection", checked);
  });
}
