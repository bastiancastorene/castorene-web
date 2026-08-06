# Hooks locales

Activación por clon:

```sh
git config core.hooksPath .githooks
```

El hook `pre-commit` ejecuta la validación estructural del sitio, bloquea temporales y patrones de secretos, y usa `node --check` cuando Node está disponible.
