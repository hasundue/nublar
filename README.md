# nublar

<!-- ![Test](https://github.com/hasundue/boilerplate-deno/actions/workflows/test.yml/badge.svg) -->
<!-- [![codecov](https://codecov.io/gh/hasundue/boilerplate-deno/branch/main/graph/badge.svg?token=7BS432RAXB)](https://codecov.io/gh/hasundue/boilerplate-deno) -->

Nublar is a CLI tool to manage your scripts installed via `deno install`.

> **Warning**\
> Still an alpha version.

## Installation

```sh
deno install --allow-read --allow-write --allow-env --allow-net https://deno.land/x/nublar@0.1.0/nublar.ts
```

## Usage

```
$ nublar -h

  Usage:   nublar
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
