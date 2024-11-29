module.exports = [
    {
      files: ['**/*.js'],
      languageOptions: {
        ecmaVersion: 12,
      },
      rules: {
        semi: ['error', 'always'], 
        quotes: ['error', 'single'],
      },
    },
  ];