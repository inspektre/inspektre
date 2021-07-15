import {Command, flags} from '@oclif/command';
import { initConfig } from '../utils/initialize';

export default class Init extends Command {
  static description = 'initialize inspektre'

  static examples = [
    `$ inspektre init`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'Verbose output'})
  }
  async run() {
    const {args, flags} = this.parse(Init);
    initConfig(args.verbose);
  }
};