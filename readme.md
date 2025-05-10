# 🧘‍♂️ CESIZen - Plateforme Bien-Être (Backoffice + API + Mobile)

Bienvenue dans le projet **CESIZen**, une application dédiée à la gestion et à la pratique d’exercices de respiration. Cette solution comprend :

- 🔧 un backoffice web (React + ShadCN)
- 🔌 une API REST (Express + Prisma)
- 📱 une application mobile (Expo + React Native)

---

## 📦 Prérequis

Avant de commencer, assure-toi d’avoir installé :

- **Node.js** (v18 ou supérieur) : [Télécharger Node.js](https://nodejs.org/)
- **npm** ou **yarn** : gestionnaire de paquets
- **Docker** (optionnel mais recommandé pour Mongo/Postgres)
- **Expo CLI** pour le projet mobile :
  ```bash
  npm install -g expo-cli
  ```

---

## 📁 Structure du projet

```
📦 mon-projet/
 ┣ 📂api/             → Backend Express + Prisma
 ┣ 📂backoffice/      → Interface admin en React
 ┣ 📂mobile/          → Application mobile avec Expo
 ┣ 📄 README.md       → Ce fichier
 ┗ 📄 .env.example     → Variables d’environnement exemple
```

---

## 🔐 Variables d’environnement

1. **Copier le fichier `.env.example` dans chaque dossier**
   ```bash
   cp .env.example .env
   ```
2. Remplir les champs :

   - **API :**

     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/cesizen
     API_URL=http://localhost:3000
     SMTP_USER=...
     SMTP_PASS=...
     ```

   - **Mobile + Backoffice :**
     ```
     API_URL=http://<TON_IP_LOCAL>:3000
     ```

---

## 🚀 Lancer chaque partie

### 1. 📡 API (Express + Prisma)

```bash
cd api
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

---

### 2. 🧠 Backoffice (React + ShadCN)

```bash
cd backoffice
npm install
npm run dev
```

> 📝 Accessible sur : `http://localhost:5173`

---

### 3. 📱 Application mobile (Expo)

```bash
cd mobile
npm install
npx expo start
```

> 📝 Scanne le QR code avec ton téléphone via **Expo Go**

---

## 🧪 Tests

### API : Jest

```bash
cd api
npm run test
```

Les tests sont dans `/tests/` et couvrent `user`, `exercise`, etc.

---

## 🗃️ Base de données (PostgreSQL avec Docker - Optionnel)

```bash
docker run --name cesizen-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=cesizen -p 5432:5432 -d postgres
```

---

## 🛠 Fonctionnalités principales

### ✅ API

- CRUD utilisateurs, exercices, sessions, favoris, commentaires
- Upload fichiers (images, mp3, pdf)
- Auth simple sans JWT (API publique)

### ✅ Backoffice

- Interface admin avec modals pour gérer les utilisateurs, exercices, sessions
- Upload de fichiers
- Interface responsive

### ✅ Mobile

- Login, signup
- Lancement d'exercices audio avec timer + création de session
- Favoris
- Profil éditable + suppression du compte
- Animation et accessibilité

---

## 📎 Remarques importantes

- Les fichiers uploadés sont stockés dans `api/uploads/`
- En production, pense à utiliser une vraie base PostgreSQL + S3 pour les fichiers
- Si tu es en Windows, attention aux chemins avec `\` pour les fichiers uploadés

---

## 🤝 Contribution

Toute contribution est bienvenue ! Forke le repo, fais une branche et une PR propre 🚀
