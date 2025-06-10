# 🚀 Exécution locale des services – Projet CESIZen

## ✅ Résumé des commandes

### 📡 API

```bash
cd API
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

✅ Serveur en ligne sur : `http://localhost:3000`  
📦 ORM utilisé : **Prisma**  
🔁 Migrations : **OK**  
🔬 Tests Jest disponibles via : `npm run test`

---

### 🧠 Backoffice (React + Vite)

```bash
cd BACKOFFICE
npm install
npm run dev
```

✅ Disponible sur : `http://localhost:5173`  
🌐 API appelée : `http://localhost:3000/api`  
📦 Stack : React 19, TanStack Query, Tailwind, ShadCN

---

### 📱 Application Mobile (Expo)

```bash
cd APP
npm install
npx expo start
```

✅ Serveur Metro actif :  
- Dev tunnel Expo natif : `exp://192.168.1.23:8081`  
- Expo Web : `http://localhost:8081`  

🌐 API appelée : `http://192.168.1.23:3000/api`  
📱 Scanner le QR avec **Expo Go**

---

## 🌐 Résumé des ports & URLs

| Service     | Port             | URL / API utilisée              | Notes                         |
|-------------|------------------|----------------------------------|-------------------------------|
| API         | `3000`           | `http://localhost:3000/api`      | Express + Prisma              |
| Backoffice  | `5173` (dev)     | `http://localhost:3000/api`      | Vite                          |
| Backoffice  | `4173` (preview) | `http://localhost:3000/api`      | Preview static                |
| Mobile      | `8081` (Expo)    | `http://192.168.1.23:3000/api`   | Tunnel Expo, localhost externe |

---

## 🔁 CORS & Proxy

📌 CORS déjà géré dans l’API (via `cors()` dans Express) — à confirmer si restrictions par IP.  
🔧 Aucun proxy Vite ou Expo configuré → appels directs à l’API.