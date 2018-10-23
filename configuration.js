'use strict';

const os = require('os');
const path = require('path');
let env = process.env;
let envType = process.env.NODE_ENV || "development";

let config =
{
    development: {
        port: env.PORT || 4000,
        databaseUrl: env.DATABASE_URL || "",
    },
    stage: {
        port: env.PORT || 5000,
        databaseUrl: '',
    },
    common: {
        tempfolder: os.tmpdir(),
        serverTimeout: 3600000
    }

};
module.exports = Object.assign(config[envType], config['common']);
