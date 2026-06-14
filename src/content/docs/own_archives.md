---
title: Run Your Own Archives
description: Set up your own versioned time series archive using the opentsi boilerplate.
---

# Run Your Own Archives

You can create and maintain your own opentsi-compatible archive. Use it privately for internal data management, or publish it to GitHub for the community to access.

## Boilerplate

The `opentsi-archive-template` repository provides everything you need to get started:

- Defined folder structure for data files and metadata
- GitHub Actions workflows for automated data updates
- A versioning scheme compatible with all opentsi client libraries

```bash
# use the template on GitHub
gh repo create my-archive --template opentsi/archive-template
```

## Archive structure

```
my-archive/
├── data/
│   ├── series-a.json
│   └── series-b.json
├── meta/
│   └── catalog.json
└── README.md
```

## Publishing to the community

Once your archive is public on GitHub, open a pull request to add it to the community index to have it listed in the [community catalog](/community_hosted/).
