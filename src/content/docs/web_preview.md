---
title: Web Previews for Visibility
description: Built-in static site generation for clean, informative dataset information pages.
---

# Web Previews for Visibility

Every opentsi archive can generate a static documentation website automatically, giving your datasets a clean, browsable front-end without extra effort.

## What gets generated

- A catalog page listing all available series
- Individual series pages with metadata and an interactive chart
- Vintage history pages showing how values have changed over time

## How it works

The web preview generator reads the standard archive structure and outputs static HTML. You can deploy it for free using GitHub Pages — the same repository that stores your data also serves the preview site.

```bash
# generate the static site locally
opentsi preview build

# deploy via GitHub Pages (configured in GitHub Actions)
opentsi preview deploy
```

## See also

- [Run your own archives](/own_archives/)
- [Community hosted data](/community_hosted/)
