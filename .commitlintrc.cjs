module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nouvelle fonctionnalité
        'fix',      // Correction de bug
        'docs',     // Modification de la documentation
        'style',    // Changements de style (formattage, etc.)
        'refactor', // Refactorisation du code
        'test',     // Ajout ou modification de tests
        'chore',    // Tâches de maintenance
      ],
    ],
    'type-case': [0, 'always', 'lower'], // Désactiver pour permettre les types personnalisés
    'type-empty': [2, 'never'],
    'scope-empty': [0, 'never'], // Scope optionnel
    'scope-case': [0, 'never'], // Scope peut être en camelCase
    'subject-empty': [2, 'never'],
    'subject-case': [0, 'never'], // Sujet peut commencer par majuscule
    'header-max-length': [2, 'always', 72],
  },
};
