# :national_park: nublar

<!-- deno-fmt-ignore-start -->

![CI](https://github.com/hasundue/nublar/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/hasundue/nublar/branch/main/graph/badge.svg?token=7BS432RAXB)](https://codecov.io/gh/hasundue/nublar)
![denoland/deno](https://img.shields.io/badge/Deno-v1.36.2-informational?logo=deno) <!-- @denopendabot denoland/deno -->

<!-- deno-fmt-ignore-end -->

`nublar` is a command-line tool to manage your scripts installed via
`deno install`.

## :passenger_ship: Installation

```sh
deno install --allow-read --allow-write --allow-env --allow-net https://deno.land/x/nublar@0.2.2/nublar.ts
```

## :world_map: Usage

```sh
# list all scripts installed in your environment
$ nublar list
nublar 0.2.2 # @denopendabot hasundue/nublar
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
