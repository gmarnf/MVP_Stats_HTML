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
