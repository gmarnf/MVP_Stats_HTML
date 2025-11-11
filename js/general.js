// Version globale (à utiliser)
function parseActifs(text) {
  return text.split("-").map(v => parseInt(v, 10)).filter(n => !Number.isNaN(n)).slice(0, 5);
}

function nowTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour12: false });
}

function getEl(id) {
  return document.getElementById(id);
}
