---
title: Track Data Revisions
description: Every revision of your time series data is preserved with full history.
---

# Track Data Revisions

opentsi stores every revision of a time series, not just the latest value. This means you can travel back in time and see exactly what your data looked like at any given point — including data that was later revised or corrected.

## Why it matters

Statistical agencies regularly revise published figures. Without version tracking, downstream models and reports silently depend on data that may have changed. opentsi makes the full revision history a first-class citizen.

## Vintage access

Each dataset version is called a **vintage**. You can request:

- The **latest** vintage — the most up-to-date values
- A **specific date** vintage — what the data looked like on a given day
- The **full history** — all revisions as a panel

## Example (R)

```r
library(opentsi)

# get the vintage as of 2023-01-01
ts <- get_ts("gdp_ch", vintage = "2023-01-01")
```
