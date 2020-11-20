const { processRepoResults, processTagCounters } = require('./processResults');

const supportedNameTags = [
    "Cryptograph",
    "Authentication",
    "Authorization",
    "LDAP",
    "Deserialization",
    "SQL",
    "Credentials"
];

const generateMeta = (data) => {
    const meta = {};
    meta.projectName = data.metaData.applicationName;
    meta.version = data.metaData.sourceVersion;
    meta.dateScanned = { formatted: new Date(data.metaData.dateScanned).toISOString() };
    meta.scanTags = [];
    
    // Get unique Tags of Interest
    data.metaData.uniqueTags.forEach(uTag => {
        supportedNameTags.forEach(sTag => {
            if(uTag.indexOf(sTag) > -1) {
                meta.scanTags.push(sTag);
            }
        });
    });
    meta.scanTags = [...new Set(meta.scanTags)];
    meta.scanTags = meta.scanTags.map(tag => {
        return {name_contains: tag};
    });
    // Get Scan Rule meta
    meta.repoResults = processRepoResults(data.metaData.detailedMatchList, meta.dateScanned, meta.projectName, meta.version);
    // Get App Types meta
    meta.appTypes = data.metaData.appTypes;
    // Get Tag Counter meta
    meta.tagCounters = processTagCounters(data.metaData.tagCounters);

    return meta;
};

module.exports = {
    generateMeta
}