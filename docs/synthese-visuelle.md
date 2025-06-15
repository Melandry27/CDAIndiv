# 🧠 Synthèse visuelle du projet CESIZen

## 📌 Architecture générale (vue simple)

```mermaid
graph TD
  subgraph Front
    Backoffice[Backoffice (React)]
    Mobile[Application Mobile (Expo)]
  end

  subgraph API
    ExpressAPI[API Express + Prisma]
    DB[(PostgreSQL Database)]
  end

  Backoffice -->|HTTP / JSON| ExpressAPI
  Mobile -->|HTTP / JSON| ExpressAPI
  ExpressAPI -->|Prisma ORM| DB
```

- **Backoffice** : gestion admin via React + Vite
- **Mobile** : app Expo pour utilisateur final
- **API** : Express, sécurisée par JWT, communique avec PostgreSQL via Prisma
- **BDD** : centralisée, gérée via Prisma Migrations

---

## ✅ Couverture des tests unitaires (Jest)

| Fichier testé                         | Statut couverture | Description |
|--------------------------------------|-------------------|-------------|
| `src/tests/user.test.ts`             | ✅ ✔️ | Création, auth, suppression utilisateur |
| `src/tests/statistic.test.ts`        | ✅ ✔️ | Création et lecture des statistiques |
| `src/tests/progress.test.ts`         | ⬜️ À faire        | Couverture non détectée |
| `src/tests/favorite.test.ts`         | ⬜️ À faire        | Tests à écrire pour favoris |
| `src/tests/exercise.test.ts`         | ⬜️ À faire        | Manque de tests pour les endpoints |
| `src/tests/history.test.ts`          | ⬜️ À faire        | Tests manquants pour historique |
| `src/tests/session.test.ts`          | ⬜️ À faire        | Sessions utilisateur à tester |
| `src/tests/resource.test.ts`         | ⬜️ À faire        | Endpoint `ressource` non couvert |
| `src/tests/category.test.ts`         | ⬜️ À faire        | Catégories à ajouter |

---

## 🎯 Objectif couverture recommandée

- Objectif minimal : ✅ tests unitaires sur 6/9 modules
- Priorité haute : `User`, `Session`, `Exercise`, `Favorite`
- À inclure dans CI : badge `npm run test` + `jest --coverage`