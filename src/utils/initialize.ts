import * as fs from 'fs';
import { Log } from './types';
import { inspetreConfigDir } from './constants';
import { appendLog } from './logger';


export const initConfig = (verbose: Boolean) => {
  if (!fs.existsSync(inspetreConfigDir)){
      fs.mkdirSync(inspetreConfigDir, { recursive: true });
      const log: Log = {
        time: new Date().getTime(),
        message: 'initializing inspektre',
        type: 'INFO',
        verbose: verbose,
        authenticated: undefined,
        user: undefined
      };
      appendLog(log);
      if(verbose === true) {
        console.log('Initializing inspektre configuration');
      }
  }
};