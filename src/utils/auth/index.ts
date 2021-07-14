import * as fs from 'fs';
import { homedir } from '../constants';
import * as open from 'open';
import got from 'got';
import cli from 'cli-ux';
import { credsFile } from '../constants';

// const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));


const startInspektreDevice = async (verbose: Boolean) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const options: any = {
        prefixUrl: 'https://inspektre.io/api/cli/newdevice',
        headers: {
          'user-agent': '@inspektre/cli'
        }
      };
      const deviceAuthorizationResponse: any = await got.post(options).json();
      const { verification_uri, verification_uri_complete, device_code, user_code, expires_in } = deviceAuthorizationResponse;
      let { interval } = deviceAuthorizationResponse;
      if (interval) {
        // interval in ms
        interval = interval * 1000;
      } else {
        interval = 5000;
      }
      resolve({ interval, verification_uri, verification_uri_complete, device_code, user_code, expires_in})
    } catch(err) {
      reject(err);
    }
  });
};

// Get Device token with Device Authorization flow.
// Flow is handled on inspektre to make this a turn-key solution.
// Advantage is that client_secret and client_id are not shared.
// Disadvantage: Device Authorization spec is violated.
const getDeviceToken = async (verbose: Boolean, deviceCode: string, interval?: number) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const options: any = {
        prefixUrl: 'https://inspektre.io/api/cli/devicetoken',
        headers: {
          'user-agent': '@inspektre/cli',
          'x-inspektre-device-code': deviceCode,
          'x-inspektre-wait-interval': interval? interval: 5000
        }
      };
      const resp: any = await got.post(options).json();
      resolve(resp);
    } catch(err) {
      reject(err);
    }
  });
};

// Read Device Token
const readToken = () => {
  const data: Buffer = fs.readFileSync(credsFile);
  const { token } = JSON.parse(data.toString()).token;
  return token;
};

// Save Device Token
const saveToken = (token: string) => {
  const data = { token, time: new Date().getTime() };
  fs.writeFileSync(credsFile, JSON.stringify(data).concat('\n'));
};

// Get Access Token (JWT) Generated from the Device Token
// const jwt = await getAccessToken();
export const getAccessToken = async() => {
  return await new Promise(async (resolve, reject) => {
    try {
      const options: any = {
        prefixUrl: 'https://inspektre.io/api/cli/accesstoken',
        headers: {
          'user-agent': '@inspektre/cli',
          'x-inspektre-token': readToken(),
        }
      };
      const resp: any = await got.post(options).json();
      resolve(resp.accessToken);
    } catch(err) {
      reject(err);
    }
  });
};

export const performDeviceLogin = async (headless: Boolean, verbose: Boolean) => {
  cli.action.start('inspektre login');
  const startDeviceAuth: any = await startInspektreDevice(verbose);
  if(!headless) {
    await open(startDeviceAuth.verification_uri_complete);
    const deviceToken: any = await getDeviceToken(verbose, startDeviceAuth.device_code, startDeviceAuth.interval);
    saveToken(deviceToken);
  } else { 
    console.log(`To Authorize this device, Please visit: ${startDeviceAuth.verification_uri_complete}`);
    setTimeout(async() => {
      const deviceToken: any = await getDeviceToken(verbose, startDeviceAuth.device_code, startDeviceAuth.interval);
      saveToken(deviceToken);
    }, startDeviceAuth.interval);
  }
  cli.action.stop();
};