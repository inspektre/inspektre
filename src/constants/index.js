const {
    DELETE_PROJECT,
    ALTER_THREAT_LEVEL_PROJECT,
    QUERY_PROJECTS, QUERY_PROJECT,
    QUERY_PROJECT_EXISTS,
    ALTER_PROJECT_TAGS,
    ALTER_PROJECT_THREAT_LEVEL,
    ALTER_PROECT_UPDATED,
    CREATE_PROJECT
} = require('./projectQL');
const {
    PROJECT_VERIFICATIONS_META,
    PROJECT_ATTACKS_META,
    PROJECT_WEAKNESS_META,
    PROJECT_SCANS_META,
    PROJECT_CODEINTEL_META,
    CODE_INTEL_SCANS_META,
    CODE_INTEL_ATTACKS_META,
    SARIF_PROJECTS_META,
    SARIF_ATTACKS_META
} = require('./projectMetaQL');
const {
    QUERY_ATTACKS_BY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SEVERITY,
    QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY,
    QUERY_ATTACKS_BY_TAG, QUERY_ATTACKS_BY_SKILL,
    QUERY_ATTACKS_BY_TAG_SEVRITY,
    QUERY_ATTACKS_BY_TAG_LIKELIHOOD,
    QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD
} = require('./attacksQL');
const { 
    QUERY_CODE_REPO_BY_PROJECT,
    CREATE_CODE_REPO
} = require('./codeRepoQL');
const { QUERY_WEAKNESS_BY_OWASP } = require('./weaknessQL');
const { CREATE_SCANS } = require('./scansQL');
const { CREATE_TOOL_RESULTS } = require('./toolResults');

const { ASSIGN_REPO_TO_PROJECT, ASSIGN_SCANS_TO_REPO_AND_PROJECT } = require('./relationsQL');

module.exports = {
    ALTER_PROJECT_THREAT_LEVEL,
    DELETE_PROJECT,
    CREATE_PROJECT,
    ALTER_THREAT_LEVEL_PROJECT,
    ALTER_PROECT_UPDATED,
    ALTER_PROJECT_TAGS,
    QUERY_PROJECTS,
    QUERY_PROJECT,
    QUERY_PROJECT_EXISTS,
    PROJECT_VERIFICATIONS_META,
    PROJECT_ATTACKS_META,
    PROJECT_WEAKNESS_META,
    PROJECT_SCANS_META,
    PROJECT_CODEINTEL_META,
    SARIF_PROJECTS_META,
    SARIF_ATTACKS_META,
    CODE_INTEL_SCANS_META,
    CODE_INTEL_ATTACKS_META,
    QUERY_ATTACKS_BY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SEVERITY,
    QUERY_ATTACKS_BY_LIKELIHOOD_AND_SEVERITY,
    QUERY_ATTACKS_BY_TAG,
    QUERY_ATTACKS_BY_TAG_SEVRITY,
    QUERY_ATTACKS_BY_TAG_LIKELIHOOD,
    QUERY_ATTACKS_BY_TAG_SEVRITY_LIKELIHOOD,
    QUERY_ATTACKS_BY_SKILL,
    QUERY_WEAKNESS_BY_OWASP,
    QUERY_CODE_REPO_BY_PROJECT,
    CREATE_CODE_REPO,
    CREATE_SCANS,
    CREATE_TOOL_RESULTS,
    ASSIGN_REPO_TO_PROJECT,
    ASSIGN_SCANS_TO_REPO_AND_PROJECT
};