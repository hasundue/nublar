# dsm - Deno Script Manager

![Test](https://github.com/hasundue/boilerplate-deno/actions/workflows/test.yml/badge.svg)
[![codecov](https://codecov.io/gh/hasundue/boilerplate-deno/branch/main/graph/badge.svg?token=7BS432RAXB)](https://codecov.io/gh/hasundue/boilerplate-deno)

A CLI Utility to manage your scripts installed via `deno install`.

> **Warning**\
> Still an alpha version.

## Installation

```sh
deno install --allow-read --allow-write --allow-env --allow-net https://deno.land/x/dsm@0.1.0/dsm.ts
```

## Usage

```sh
$ dsm -h

  Usage:   dsm
  Version: 0.1.0

  Description:

    Deno Script Manager

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    update  - Update all installed scripts
    list    - list all installed scripts
```
