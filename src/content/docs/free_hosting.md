---
title: Free Hosting
description: Leverage GitHub for free data hosting and version control with no infrastructure costs.
---

We have seen promising academic projects die because funding phased out. 
Often, even the financial commitment needed would have been rather little.
Yet, it remains challenging to find good solutions to continue hosting a project particularly on university infrastructure. 

## How Free Hosting Works

Hence, the Open Time Series initiative chooses open source friendly, globally available platforms that offer decent amounts of free space to host text formats in publicly available data archives. 
Admittedly, as of summer 2026 our toolchain packages focus on GitHub, but support for other Git providers such as [codefloe.com](https://codefloe.com) or [Gitlab](https://gitlab.com) are important steps on the *opentsi* roadmap.

Each archive is a GitHub repository with a defined folder structure. Data files are stored as flat files - JSON for metadata and CSV for the time series themselves -- and versioned with Git, resulting in the following benefits by design: 

- **No infrastructure costs** — GitHub's free tier covers public repositories
- **Built-in version control** — every data update is a git commit with a timestamp and author
- **High availability** — GitHub's CDN serves data globally

## Reducing the Strain on the Free Tier

While the *opentimeseries* data consumption packages do direct requests to the GitHub API for quick lookups, they offer caching data in local git repositories. 
I.e., the read operation clones the repository in question into a `~/.cache/` (or into any custom defined location) folder and continues to read from there avoiding hourly API limits. 


## Limitations

The tradeoff of using one of the most battle-tested approaches to versioning text based information in git, is that it git was not designed to version data in the first place. 
The good news is: the limitations that result from building on a version control system designed for source code, are not relevant to our type of data. 
Our work focuses on yearly, semi-annual, quarterly, monthly, weekly and daily time series, plus irregular time series of similar frequency.
In addition our focus on data stemming from official statistics, limiting dataset sizes including different versions of time series well within the capabilities of git and remote providers' free tiers. 
Plus splitting datasets into multiple repositories helps to keep dataset size reasonable.
