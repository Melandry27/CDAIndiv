# 📜 Commandes utiles & ports

## Vue d’ensemble

| Sous-projet                   | Dossier       | Commande dev  | Build / Preview                     | Tests          | Lint           | Port dev                  |
| ----------------------------- | ------------- | ------------- | ----------------------------------- | -------------- | -------------- | ------------------------- |
| **API** (Express + Prisma)    | `API/`        | `npm run dev` | `npm run build` → `npm start`       | `npm run test` | —              | **3000**                  |
| **Backoffice** (React + Vite) | `BACKOFFICE/` | `npm run dev` | `npm run build` → `npm run preview` | —              | `npm run lint` | **5173** (`4173` preview) |
| **Mobile** (Expo)             | `APP/`        | `npm start`   | `npm run web` (Expo Web)            | —              | `npm run lint` | **19000** / **19006**     |

---

## 📡 API

```jsonc
"scripts": {
  "dev":   "ts-node-dev --respawn --transpile-only src/server.ts",
  "test":  "jest --detectOpenHandles --forceExit",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

**Source :** `API/package.json` melandry27-cdaindiv

| Commande | Usage |
|----------|-------|
| `npx prisma generate` | Génère le client Prisma |
| `npx prisma migrate dev` | Applique les migrations locales |
| `npx prisma studio` | UI web de la base |

> **Port par défaut :** `3000`

---

## 🧠 Backoffice

```jsonc
"scripts": {
  "dev":     "vite",
  "build":   "tsc -b && vite build",
  "preview": "vite preview",
  "lint":    "eslint ."
}
```

**Source :** `BACKOFFICE/package.json` melandry27-cdaindiv

- **Port dev :** `5173`
- **Port preview :** `4173`
- **Stack :** React 19, Tailwind 4, ShadCN UI

---

## 📱 Application mobile (Expo)

```jsonc
"scripts": {
  "start":         "expo start --clear",
  "android":       "expo start --android",
  "ios":           "expo start --ios",
  "web":           "expo start --web",
  "reset-project": "node ./scripts/reset-project.js",
  "lint":          "expo lint"
}
```

**Source :** `APP/package.json` melandry27-cdaindiv

> **Ports :** `19000` (bundle natif) / `19006` (web)

---

## 🛠️ Version de Node recommandée

Ajouter dans chaque `package.json` :

```jsonc
"engines": { "node": ">=18.18" }
```