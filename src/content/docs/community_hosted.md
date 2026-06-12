---
title: Community Hosted Data
description: Find datasets from different public sources turned into scientific-grade time series data.
---

The opentsi community curates and hosts datasets from a variety of public sources, standardized into a single homogeneous format. Real-time and historical information is accessible across origins without dealing with incompatible formats.

## What is Available? 

- Macroeconomic indicators from national statistics offices
- Financial market data from public feeds
- Climate and environmental data from open repositories

## How Does it Work?

Community archives live on GitHub under the [opentsi organization](https://github.com/opentsi). Each archive follows a common structure so that client libraries can read any of them without custom adapters.

## Contributing

If you maintain a dataset and want to share it, we have an opensource toolchain and boilerplating to help ensure data and metadata quality. 
In addition our boilerplating helps with the CI process to make sure data is updated in automated fashion when new publications become available.

The deloRean R package helps you set up an *opentsi* compliant, git backed time series archive including meta information and a GitHub Action for regular data updates.
Find out more from the deloRean package documentation.

Once your data repository is available from a remote host such as GitHub, inform us about your wish to transfer the repository to the *opentsi* GitHub Org through a data listing request. 
After we have reviewed your data package, we will accept your transfer request on GitHub.
