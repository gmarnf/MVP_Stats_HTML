// Utilitaires généraux (version globale)

function parseActifs(text) {
  return text
    .split("-")
    .map(v => parseInt(v, 10))
    .filter(n => !Number.isNaN(n))
    .slice(0, 5);
}

function nowTime() {
  return new Date().toLocaleTimeString("fr-FR", { hour12: false });
}

function getEl(id) {
  return document.getElementById(id);
}

function saveLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("saveLocal error", e);
  }
}

function loadLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.warn("loadLocal error", e);
    return fallback;
  }
}
