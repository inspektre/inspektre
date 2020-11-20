const fs = require('fs');
const { homedir } = require('os');
const path = require('path');
const figures = require('figures');
const yaml = require('js-yaml');
const { ApolloClient, InMemoryCache, HttpLink, ApolloLink } = require('apollo-boost');
const fetch = require('node-fetch');
const { handleErrors } = require('./errors');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Configuration files
// Set silent=true if STDOUT needs to be suppressed
const initConfig = (verbose) => {
    // Get Home Dir for POSIX of Windows
    const dir = path.join(homedir(), '.inspektre')
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    if(verbose === true) {
        process.stdout.write(figures.main.pointer.concat(" Config location", dir, "\n"));
        process.stdout.write(figures.main.tick.concat(" Initialization is complete\n"));
    }
};


// Update
const writeAuthConfig = (data) => {
    const yamlStr = yaml.safeDump(data);
    fs.writeFileSync(path.join(homedir(), '.inspektre', 'auth.yml'), yamlStr, 'utf-8');
    process.env.INSPEKTRE_ACCESS_TOKEN = data.inspektre_access_token;
    process.env.INSPEKTRE_REFRESH_TOKEN = data.inspektre_access_token;

};

const readAuthConfig = () => {
    let data = null;
    console.log(process.env.INSPEKTRE_REFRESH_TOKEN);
    try {
        if(process.env.INSPEKTRE_REFRESH_TOKEN && process.env.INSPEKTRE_CLIENT_ID && process.env.INSPEKTRE_ACCESS_TOKEN) {
            data.inspektre_client_id = process.env.INSPEKTRE_REFRESH_TOKEN;
            data.inspektre_refresh_token = process.env.INSPEKTRE_REFRESH_TOKEN;
            data.inspektre_access_token = process.env.INSPEKTRE_ACCESS_TOKEN;
        }
        else {
            let fileContents = fs.readFileSync(path.join(homedir(), '.inspektre', 'auth.yml'), 'utf8');
            data = yaml.safeLoad(fileContents);
        }
    } catch (e) {
        console.log(figures.main.cross.concat(" Please login to continue."));
        process.exitCode = 1;
    }
    return data;
};

const httpLink = new HttpLink({ uri: 'https://api.inspektre.io', fetch: fetch });

// Create authorization Link middleware
const authLink = new ApolloLink((operation, forward) => {
  const token = readAuthConfig().inspektre_access_token;
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : `Bearer ${process.env.inspektre_access_token}`
    }
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

// Inspektre API Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

// File Exists
const fileExists = (file) => {
    try {
        if(fs.existsSync(file)) {
            return require(file);
        } 
        return false;
    } catch (err) {
        return false;
    }
};

// File Contents

module.exports = { client, initConfig, writeAuthConfig, readAuthConfig, handleErrors, fileExists };