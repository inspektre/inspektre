import {Command, flags} from '@oclif/command';
import { performDeviceLogin } from '../utils/auth';
const inquirer = require('inquirer');


export default class Login extends Command {
  static description = 'Login to inspektre CLI'

  static examples = [
    `$ inspektre login`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    verbose: flags.boolean({char: 'v', description: 'Verbose output'}),
  }


  async run() {
    const {args, flags} = this.parse(Login);
    let headless = false;
    let responses: any = await inquirer.prompt([{
      name: 'headless',
      message: 'Open browser to continue with device activation?',
      type: 'list',
      choices: [{name: 'Yes'}, {name: 'No'}],
    }]);

    headless = responses.headless === 'No'? true: false;
    await performDeviceLogin(headless, flags.verbose);
  }
};