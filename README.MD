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
$ npm install -g inspektre
$ inspektre COMMAND
running command...
$ inspektre (-v|--version|version)
inspektre/3.3.20 darwin-x64 node-v14.17.3
$ inspektre --help [COMMAND]
USAGE
  $ inspektre COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`inspektre hello [FILE]`](#inspektre-hello-file)
* [`inspektre help [COMMAND]`](#inspektre-help-command)

## `inspektre hello [FILE]`

describe the command here

```
USAGE
  $ inspektre hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ inspektre hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/inspektre/inspektre/blob/v3.3.20/src/commands/hello.ts)_

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
<!-- commandsstop -->
