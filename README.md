# 🛒 ChopChop - Gestion Intelligente de Listes de Courses

ChopChop est une application moderne de gestion de listes de courses développée avec React et TypeScript. Elle permet de créer, organiser et partager des listes de courses de manière intuitive et efficace.

## ✨ Fonctionnalités

- 📝 **Création rapide de listes** - Interface intuitive pour ajouter et gérer des articles
- 🏷️ **Organisation par catégories** - Classement automatique des articles par rayons
- 📤 **Partage facile** - Partagez vos listes avec famille et amis
- 📱 **Interface responsive** - Optimisée pour mobile et desktop
- ⚡ **Performance optimisée** - Application rapide et fluide
- 🔍 **Recherche avancée** - Trouvez rapidement vos articles

## 🚀 Technologies Utilisées

- **Frontend** : React 19 avec TypeScript
- **Build** : Vite
- **Styling** : Tailwind CSS & shadcn/ui
- **Base de données** : Supabase (PostgreSQL)
- **API** : Supabase Functions
- **Tests** : Vitest + React Testing Library
- **Linting** : ESLint + Prettier
- **Git Hooks** : Husky + Commitlint

## 📦 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- npm

### Installation des dépendances

```bash
# Cloner le projet
git clone https://github.com/votre-username/chopchop.git
cd chopchop

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

## 🛠️ Scripts Disponibles

### Développement

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire l'application pour la production
npm run preview      # Prévisualiser la build de production
```

### Qualité du code

```bash
npm run lint         # Vérifier la qualité du code
npm run format       # Formater le code avec Prettier
npm run format:check # Vérifier le formatage
npm run type-check   # Vérifier les types TypeScript
```

### Tests

```bash
npm run test         # Lancer les tests une fois
npm run test:watch   # Tests en mode surveillance
npm run test:coverage # Tests avec rapport de couverture
```

### Pre-commit

```bash
npm run pre-commit   # Lancer lint + tests + type-check (utilisé par Husky)
```

## 🏗️ Structure du Projet

```
src/
├── components/          # Composants React réutilisables
│   ├── ui/             # Composants de base (Button, Input, etc.)
│   ├── layout/         # Composants de mise en page (Header, Footer)
│   └── features/       # Composants spécifiques aux fonctionnalités
├── hooks/              # Hooks personnalisés React
├── types/              # Définitions de types TypeScript
├── utils/              # Fonctions utilitaires
├── contexts/           # Contextes React pour la gestion d'état
└── data/               # Données mockées et constantes
```

## 🎯 Conventions de Développement

### Git Workflow

- **Branches** : `feats/nom-fonctionnalite`, `fixes/nom-bug`, `docs/sujet`
- **Commits** : Format Conventional Commits (ex: `feat: add shopping list sharing`)
- **Pull Requests** : Obligatoires pour toute modification sur `main`

### Standards de Code

- **TypeScript** : Typage strict obligatoire
- **Components** : PascalCase (ex: `ShoppingList`)
- **Hooks** : camelCase avec préfixe "use" (ex: `useShoppingList`)
- **Files** : PascalCase pour composants, camelCase pour autres

### Tests

- **Coverage** : Minimum 80% de couverture
- **Structure** : Arrange-Act-Assert
- **Outils** : Vitest + React Testing Library

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` :

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Hooks Pre-commit

Les hooks Husky sont automatiquement configurés pour :

- ✅ Vérifier le linting (ESLint)
- ✅ Lancer les tests (Vitest)
- ✅ Vérifier les types (TypeScript)
- ✅ Valider le format des commits (Commitlint)

## 📱 Fonctionnalités Prévues

- [ ] **Authentification utilisateur**
- [ ] **Synchronisation cloud**
- [ ] **Mode hors ligne**
- [ ] **Notifications push**
- [ ] **Thème sombre**
- [ ] **Historique des achats**
- [ ] **Suggestions d'articles**

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feats/amazing-feature`)
3. Commit vos changements (`git commit -m 'feat: add amazing feature'`)
4. Push vers la branche (`git push origin feats/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

- **Développeur Principal** : [Votre Nom](https://github.com/votre-username)

## 🆘 Support

Pour toute question ou problème :

- 🐛 [Issues GitHub](https://github.com/votre-username/chopchop/issues)
- 📧 Email : support@chopchop.app
- 💬 Discord : [Serveur ChopChop](https://discord.gg/chopchop)

---

⭐ **N'hésitez pas à mettre une étoile si ce projet vous plaît !**
