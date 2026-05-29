---
title: R Integration
description: Work with opentsi archives directly from R using familiar data science workflows.
---

# R Integration

The `opentsi` R package lets you read data from any opentsi-compatible archive without dealing with raw files or API calls. Stay in your existing workflow and use standard R objects.

## Installation

```r
# install from GitHub
remotes::install_github("opentsi/opentimeseries")
```

## Basic usage

```r
library(opentsi)

# list available series
catalog <- list_series("opentsi/ch-macro")

# fetch a single series (returns an xts or ts object)
gdp <- get_ts("gdp_ch_real")

# fetch with a specific vintage
gdp_2022 <- get_ts("gdp_ch_real", vintage = "2022-06-01")
```

## Integration with tidyverse

```r
library(dplyr)

gdp |>
  as_tibble(rownames = "date") |>
  filter(date >= "2000-01-01")
```

## See also

- [Community hosted data](/community_hosted/)
- [Track data revisions](/track_data/)
