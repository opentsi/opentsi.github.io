---
title: Read Time Series Vintages into R
description: Work with opentsi archives directly from R using familiar data science workflows.
---

The `opentsi` R package lets you read data from any opentsi-compatible archive without dealing with raw files or API calls. Stay in your existing workflow and use standard R objects.

## Installation

```r
# install from GitHub
remotes::install_github("opentsi/opentimeseries")
```

## Basic usage

```r
library(opentimeseries)

# list available series
catalog <- list_series("opentsi/ch.kof.globalbaro")

# read most recent publication
leading <- read_open_ts()

# read another publication of the same time series 
leading_v261 <- read_open_ts()


```
