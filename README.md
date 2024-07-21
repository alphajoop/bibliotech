# Bibliotech

Bibliotech est un système de gestion de bibliothèque universitaire permettant de gérer les prêts et retours de livres, la gestion des utilisateurs, la catalogage des livres et l'envoi de notifications par email pour les rappels de retour. Le frontend est développé en TypeScript (tsx) et déployé sur Vercel, tandis que le backend est développé en JavaScript et déployé sur Render.

## Fonctionnalités

- **Gestion des Utilisateurs :**
  - Ajout d'utilisateur avec envoi de notification par email.
  - Suppression d'utilisateur avec envoi de notification par email.
  - Liste des utilisateurs avec pagination et recherche.
  - Authentification des administrateurs.

- **Gestion des Livres :**
  - Ajout de livre avec informations détaillées.
  - Suppression de livre.
  - Liste des livres avec pagination et recherche.

- **Gestion des Prêts et Retours :**
  - Prêt de livre avec envoi de notification par email.
  - Retour de livre avec envoi de notification par email.
  - Envoi de rappels de retour par email.

## Technologies Utilisées

- **Frontend :** TypeScript (tsx), React, Tailwind CSS, déployé sur Vercel.
- **Backend :** JavaScript, Node.js, Express, MongoDB, déployé sur Render.

## Prérequis

- Node.js (version 20 ou supérieure)
- Yarn

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/alphajoop/bibliotech.git
   cd bibliotech
   ```

2. Installez les dépendances pour le frontend et le backend :

   ```bash
   cd client
   yarn install
   cd ../server
   yarn install
   ```

## Lancer le Projet

1. Lancer le client :

   ```bash
   cd client
   yarn run dev
   ```

2. Lancer le serveur :

   ```bash
   cd ../server
   yarn run dev
   ```

## Structure du Projet

- **client/** : Contient le code source du frontend développé en TypeScript (tsx).
- **server/** : Contient le code source du backend développé en JavaScript.

## Contribuer

Les contributions sont les bienvenues ! Si vous avez des suggestions ou des améliorations, veuillez ouvrir une issue ou soumettre une pull request.

## License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

Ce fichier README fournit une vue d'ensemble du projet, les instructions d'installation et de lancement, ainsi que des informations sur la structure du projet et la contribution.
