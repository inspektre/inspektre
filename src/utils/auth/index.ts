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
    } catch(err: any) {
      reject(err);
    }
  });
};

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

const readToken = async () => {
  const data: Buffer = fs.readFileSync(credsFile);
  return JSON.parse(data.toString());
};

const saveToken = async (token: string) => {
  const data = { token, time: new Date().getTime() };
  fs.writeFileSync(credsFile, JSON.stringify(data).concat('\n'));
};

const getAccessToken = async(token: string) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const options: any = {
        prefixUrl: 'https://inspektre.io/api/cli/accesstoken',
        headers: {
          'user-agent': '@inspektre/cli',
          'x-inspektre-token': token,
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
  } else { 
    console.log(`To Authorize this device, Please visit: ${startDeviceAuth.verification_uri_complete}`);
    setTimeout(async() => {
      const deviceToken: any = await getDeviceToken(verbose, startDeviceAuth.device_code, startDeviceAuth.interval);
      saveToken(deviceToken);
    }, startDeviceAuth.interval);
  }
  cli.action.stop();
};