import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

type PublicRuntimeConfig = {
    API_URL: string
    VERSION: string
};

export default publicRuntimeConfig as PublicRuntimeConfig;
