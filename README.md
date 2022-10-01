# :national_park: nublar

![CI](https://github.com/hasundue/nublar/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/hasundue/nublar/branch/main/graph/badge.svg?token=7BS432RAXB)](https://codecov.io/gh/hasundue/nublar)

`nublar` is a command-line tool to manage your scripts installed via
`deno install`.

## :passenger_ship: Installation

```sh
deno install --allow-read --allow-write --allow-env --allow-net https://deno.land/x/nublar@0.2.0/nublar.ts
```

## :world_map: Usage

```sh
# list all scripts installed in your environment
$ nublar list
nublar 0.2.0
udd    0.5.0

# check updates for them
$ nublar update --check
Found udd 0.5.0 => 0.7.5

# update all outdated scripts
$ nublar update
Updated udd 0.5.0 => 0.7.5

# or you may specify scripts to be updated
$ nublar update udd
```
