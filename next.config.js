const withSass = require('@zeit/next-sass');

require('dotenv').config();

module.exports = withSass({
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        VERSION: process.env.npm_package_version,
    },
});
