import {Command, flags} from '@oclif/command';
import { performDeviceLogin, performDeviceLogout, performDeviceRefresh } from '../utils/auth';
const inquirer = require('inquirer');


export default class AuthCommand extends Command {
  static description = 'Manage Authentication of an inspektre account'
  static examples = [
    `$ inspektre auth --action=login`,
    `$ inspektre auth --action=logout`,
    `$ inspektre auth --action=refresh`,
  ]
  static args = [
    {
      name: 'action',
      description: 'Select one inspektre auth action',
      required: true,
      options: (['login', 'logout', 'refresh'])
    }
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({ char: 'v', description: 'Verbose output' }),
  };

  async run() {
    const {args, flags} = this.parse(AuthCommand);
    switch(args.action) {
      case 'login':
        let headless = false;
        let responses: any = await inquirer.prompt([{
          name: 'headless',
          message: 'Open browser to continue with device activation?',
          type: 'list',
          choices: [{name: 'Yes'}, {name: 'No'}],
        }]);
        headless = responses.headless === 'No'? true: false;
        await performDeviceLogin(headless, flags.verbose);
        break;
      case 'logout':
        await performDeviceLogout(flags.verbose);
        break;
      case 'refresh':
        await performDeviceRefresh(flags.verbose);
        break;
      default:
        break;
    }
  }
};