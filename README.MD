inspektre
=========

Inspektre CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/inspektre.svg)](https://npmjs.org/package/inspektre)
[![Downloads/week](https://img.shields.io/npm/dw/inspektre.svg)](https://npmjs.org/package/inspektre)
[![License](https://img.shields.io/npm/l/inspektre.svg)](https://github.com/inspektre/inspektre/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @inspektre/inspektre
$ inspektre COMMAND
running command...
$ inspektre (-v|--version|version)
@inspektre/inspektre/3.3.20 darwin-x64 node-v14.17.3
$ inspektre --help [COMMAND]
USAGE
  $ inspektre COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`inspektre help [COMMAND]`](#inspektre-help-command)
* [`inspektre init`](#inspektre-init)
* [`inspektre login`](#inspektre-login)

## `inspektre help [COMMAND]`

display help for inspektre

```
USAGE
  $ inspektre help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `inspektre init`

initialize inspektre

```
USAGE
  $ inspektre init

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Verbose output

EXAMPLE
  $ inspektre init
```

_See code: [src/commands/init.ts](https://github.com/inspektre/inspektre/blob/v3.3.20/src/commands/init.ts)_

## `inspektre login`

Login to inspektre CLI

```
USAGE
  $ inspektre login

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Verbose output

EXAMPLE
  $ inspektre login
```

_See code: [src/commands/login.ts](https://github.com/inspektre/inspektre/blob/v3.3.20/src/commands/login.ts)_
<!-- commandsstop -->
