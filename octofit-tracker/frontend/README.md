# OctoFit Tracker Frontend

This React 19 app uses `react-router-dom` and loads backend resources from:

- `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

## Environment Variable

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local`.

Example:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

## Safe Fallback

If `VITE_CODESPACE_NAME` is not set, the app falls back to:

- `http://localhost:8000/api`

This prevents invalid URLs like `https://undefined-8000.app.github.dev`.
