import * as fs from 'fs';
import * as path from 'path';
import { Log } from './types';
import { logFile } from './constants';

export const appendLog = (log: Log) => {
  fs.appendFile(logFile, JSON.stringify(log).concat("\n"), function (err) {
    if (err) throw err;
  });
};