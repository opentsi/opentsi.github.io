# opentsi.github.io

Marketing website for the Open Time Series Initiative (OpenTSI).

## Tech Stack

- **Astro 6.x** - Static site generator
- **Vue 3** - Interactive components
- **TailwindCSS 4.x** - Styling
- **Bun** - Package manager and runtime

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Automated Dependency Updates

This project uses **Renovate** for automated dependency updates, completely free on GitHub!

### Setup Renovate (One-time)

1. Go to https://github.com/apps/renovate
2. Click "Install"
3. Select the `opentsi` organization (or your account)
4. Choose "Only select repositories" and select `opentsi.github.io`
5. Click "Install"

That's it! Renovate will now:
- 🔄 Create PRs for dependency updates weekly (Mondays before 3am CET)
- ✅ **Auto-merge** minor and patch updates automatically
- ⚠️ **Manual review required** for major version updates
- 📦 Group related packages (Astro, Tailwind, Vue, etc.)
- 🔐 Alert you to security vulnerabilities immediately
- 🧹 Maintain lock files monthly

Configuration: See `renovate.json` for customization options.

## CI/CD

GitHub Actions workflows:
- **CI** (`.github/workflows/ci.yml`) - Runs on PRs and pushes to **main only**
- **Deploy** (`.github/workflows/deploy.yml`) - Deploys to GitHub Pages on push to **main only**

**Note**: Workflows are configured to only run on the `main` branch. The `relaunch` branch is safe from CI/CD automation until merged to main.

### Enable GitHub Pages

1. Go to repository Settings → Pages
2. Set "Source" to "GitHub Actions"
3. Save

Your site will be live at `https://opentsi.github.io/`

## Project Structure

```
├── src/
│   ├── components/      # Vue components
│   │   ├── Hero.vue
│   │   ├── Features.vue
│   │   ├── CodeExample.vue
│   │   └── Button.vue
│   ├── layouts/         # Astro layouts
│   │   └── Layout.astro
│   ├── pages/           # File-based routing
│   │   └── index.astro
│   └── styles/          # Global styles
│       └── globals.css
├── public/              # Static assets
├── astro.config.mjs     # Astro configuration
└── renovate.json        # Renovate configuration
```

## Features

- 🎨 Dark mode by default with custom theme
- 🌐 R and Python code examples with language switcher
- 📱 Fully responsive design
- ⚡ Optimized build with Astro
- 🔄 Automated dependency updates with Renovate
- 🚀 Auto-deploy to GitHub Pages

## License

See the main [OpenTSI](https://github.com/opentsi) organization for license information.
