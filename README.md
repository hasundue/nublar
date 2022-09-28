# :national_park: nublar

![CI](https://github.com/hasundue/nublar/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/hasundue/nublar/branch/main/graph/badge.svg?token=7BS432RAXB)](https://codecov.io/gh/hasundue/nublar)

`nublar` is a command-line tool to manage your scripts installed via
`deno install`.

> **Warning**\
> Still an alpha version.

## :passenger_ship: Installation

```sh
deno install --allow-read --allow-write --allow-env --allow-net https://deno.land/x/nublar@0.1.2/nublar.ts
```

## :world_map: Usage

```
$ nublar -h

  Usage:   nublar
  Version: 0.1.1

  Description:

    Deno Script Manager

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    update  - Update all installed scripts
    list    - list all installed scripts
```
