// Démo de joueurs et logique de saisie des stats

const joueurs = loadLocal("joueursData", [
  { numero: 4, nom: "Joueur 4", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
  { numero: 7, nom: "Joueur 7", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
  { numero: 9, nom: "Joueur 9", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
  { numero: 11, nom: "Joueur 11", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 },
  { numero: 15, nom: "Joueur 15", t2: 0, t3: 0, lf: 0, reb: 0, pd: 0, fautes: 0 }
]);

function saveJoueurs() {
  saveLocal("joueursData", joueurs);
}

function renderCadre() {
  const cadre = getEl("cadre");
  if (!cadre) return;

  cadre.innerHTML = joueurs.map(j => `
    <div class="player-card" data-numero="${j.numero}">
      <h3>#${j.numero} — ${j.nom}</h3>
      <div class="player-stats">
        <div class="stat"><div class="label">2 pts</div><div class="value" id="v_t2_${j.numero}">${j.t2}</div></div>
        <div class="stat"><div class="label">3 pts</div><div class="value" id="v_t3_${j.numero}">${j.t3}</div></div>
        <div class="stat"><div class="label">LF</div><div class="value" id="v_lf_${j.numero}">${j.lf}</div></div>
        <div class="stat"><div class="label">REB</div><div class="value" id="v_reb_${j.numero}">${j.reb}</div></div>
        <div class="stat"><div class="label">PD</div><div class="value" id="v_pd_${j.numero}">${j.pd}</div></div>
        <div class="stat"><div class="label">Fautes</div><div class="value" id="v_f_${j.numero}">${j.fautes}</div></div>
      </div>
      <div class="stat-btns">
        <button class="success" onclick="enregistrerTir(${j.numero}, '2pts')">+1 tir 2 pts</button>
        <button class="success" onclick="enregistrerTir(${j.numero}, '3pts')">+1 tir 3 pts</button>
        <button class="success" onclick="enregistrerLF(${j.numero})">+1 LF</button>
        <button onclick="enregistrerReb(${j.numero})">+1 REB</button>
        <button onclick="enregistrerPD(${j.numero})">+1 PD</button>
        <button class="danger" onclick="enregistrerFaute(${j.numero})">+1 Faute</button>
      </div>
    </div>
  `).join("");
}

function findJoueur(numero) {
  return joueurs.find(j => j.numero === numero);
}

function updateValue(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function logIfActifs(numero, label) {
  const periode = getPeriode();
  const score = getScore();
  const actifs = getActifs();
  if (actifs.length === 5) {
    ajouterLog(periode, numero, label, score, actifs);
  }
}

function enregistrerTir(numero, typeTir) {
  const j = findJoueur(numero);
  if (!j) return;

  if (typeTir === "2pts") {
    j.t2 += 1;
    updateValue(`v_t2_${numero}`, j.t2);
    saveJoueurs();
    logIfActifs(numero, "tir 2pts réussi");
  } else if (typeTir === "3pts") {
    j.t3 += 1;
    updateValue(`v_t3_${numero}`, j.t3);
    saveJoueurs();
    logIfActifs(numero, "tir 3pts réussi");
  }
}

function enregistrerLF(numero) {
  const j = findJoueur(numero);
  if (!j) return;
  j.lf += 1;
  updateValue(`v_lf_${numero}`, j.lf);
  saveJoueurs();
  logIfActifs(numero, "lancer franc réussi");
}

function enregistrerReb(numero) {
  const j = findJoueur(numero);
  if (!j) return;
  j.reb += 1;
  updateValue(`v_reb_${numero}`, j.reb);
  saveJoueurs();
  logIfActifs(numero, "rebond");
}

function enregistrerPD(numero) {
  const j = findJoueur(numero);
  if (!j) return;
  j.pd += 1;
  updateValue(`v_pd_${numero}`, j.pd);
  saveJoueurs();
  logIfActifs(numero, "passe décisive");
}

function enregistrerFaute(numero) {
  const j = findJoueur(numero);
  if (!j) return;
  j.fautes += 1;
  updateValue(`v_f_${numero}`, j.fautes);
  saveJoueurs();
  logIfActifs(numero, "faute");
}
