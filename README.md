# MVP Stats Basket 🏀

Concept original par AlCo MVP Stats

Application web simple en **HTML/CSS/JavaScript** pour la prise de statistiques en match de basket-ball.  
Elle permet de suivre les performances des joueurs, gérer le score en temps réel, journaliser les événements et contrôler le chronomètre des périodes.

---

## ✨ Fonctionnalités

- **Prise de statistiques individuelles**
  - Tir à 2 points, tir à 3 points, lancer franc
  - Rebonds, passes décisives, fautes
  - Mise à jour automatique des valeurs affichées

- **Score automatique**
  - Incrémentation du score de l’équipe et de l’adversaire
  - Affichage dynamique du score `Équipe - Adversaire`
  - Journalisation des points ajoutés

- **Journalisation horodatée**
  - Chaque action est enregistrée avec :
    - Heure
    - Période
    - Numéro du joueur
    - Statistique modifiée
    - Score actuel
    - Joueurs actifs (5 sélectionnés)
  - Affichage du journal en HTML (tableau)
  - Export CSV pour analyse après match
  - Réinitialisation possible

- **Sélection des joueurs actifs**
  - Cases à cocher pour choisir les 5 joueurs sur le terrain
  - Journalisation activée uniquement si 5 joueurs sont sélectionnés
  - Persistance de la sélection via `localStorage`

- **Chronomètre de quart-temps**
  - Durée paramétrable (par défaut 10 minutes)
  - Décompte en temps réel
  - Boutons : Démarrer, Pause, Réinitialiser
  - Alerte en fin de période

- **Persistance locale**
  - Sauvegarde automatique des données dans `localStorage` :
    - Statistiques des joueurs
    - Score équipe/adversaire
    - Période et score manuel
    - Sélection des joueurs actifs
    - Journal des actions

---

## 📂 Structure du projet

