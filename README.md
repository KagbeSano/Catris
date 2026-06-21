# Catris

Application mobile React Native construite avec Expo.

## Prérequis

- Node.js LTS (≥ 20)
- npm
- Git
- Pour exécuter l'app sur un appareil :
  - **Expo Go** installé sur iOS ou Android, **ou**
  - Émulateur Android (Android Studio), **ou**
  - Simulateur iOS (Xcode, macOS uniquement)

## Installation

```bash
git clone <url-du-repo>
cd Catris
npm install
```

Si un fichier `.env.example` est présent, le copier :

```bash
cp .env.example .env
```

## Lancement de l'application

Démarrer le serveur de développement Expo :

```bash
npx expo start -d
```

## Conventions de commits

Le projet suit la spécification [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope>): <description>
```

Types autorisés :

| Type | Usage |
|------|-------|
| `feat` | nouvelle fonctionnalité |
| `fix` | correction de bug |
| `refactor` | refactorisation sans changement fonctionnel |
| `docs` | documentation uniquement |
| `chore` | maintenance, build, dépendances, CI, tests, formatage |

Exemples :

```
feat(game): add piece rotation logic
fix(auth): handle expired token on cold start
refactor(store): extract score reducer
docs(readme): update launch instructions
chore(deps): bump expo to 51
```

## Conventions de nommage des branches

Types :

- `feature/` — nouvelle fonctionnalité
- `fix/` — correction de bug
- `chore/` — maintenance, refactorisation, documentation, dépendances

Description : en anglais, en `kebab-case`, concise. Le numéro d'issue peut préfixer la description.

Exemples :

```
feature/score-leaderboard
fix/42-piece-collision
chore/upgrade-expo-sdk
```

Branche protégée :

- `main` —  pas de push direct

## Soumission d'une Pull Request

1. **Créer une branche** depuis `develop` :

   ```bash
   git checkout main
   git pull
   git checkout -b feature/my-feature
   ```

2. **Commiter** selon les conventions ci-dessus.

3. **Pousser** la branche :

   ```bash
   git push -u origin feature/my-feature
   ```

4. **Ouvrir la PR** vers `main` avec :
   - un titre au format Conventional Commits
   - au moins un reviewer assigné

5. **Critères de merge** :
   - CI verte (lint, typecheck, tests, build)
   - Au moins une approbation
   - Pas de conflit avec la branche cible
   - Tous les commentaires de review traités

6. **Stratégie de merge** : `Squash and merge` pour garder un historique linéaire sur `develop`.

## Style de code

- ESLint (configuration Expo)
- Prettier
- TypeScript en mode strict

À vérifier localement avant de pousser :

```bash
npm run lint
npm run typecheck
npm test
```

L'ensemble du code, des commentaires et des messages de log est rédigé en anglais.

## Architecture

```
Catris/
├── src/
│   ├── components/    # composants réutilisables
│   ├── contexts/      # React contexts (état global)
│   ├── data/          # données statiques, fixtures, constantes
│   ├── hooks/         # hooks personnalisés
│   ├── models/        # types, interfaces, schémas de domaine
│   ├── navigation/    # configuration de navigation (stacks, tabs)
│   ├── screens/       # écrans de l'application
│   └── services/      # logique métier, appels API, persistance
├── assets/            # images, polices
└── app.json           # configuration Expo
```