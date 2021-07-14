import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

export const homedir = os.homedir();
export const inspetreConfigDir = path.join(homedir, '/.config/inspektre');
export const logFile = path.join(inspetreConfigDir, 'cli.log');
export const credsFile = path.join(inspetreConfigDir, 'creds.json');