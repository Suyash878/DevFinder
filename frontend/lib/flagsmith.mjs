
import flagsmith from 'flagsmith/isomorphic'

const flagsmithConfig = {
    environmentID: '5q3Ctrf56jArg3hwNRX25s',
    cacheFlags: false,
    enableLogs: true,
    // Add polling interval (in milliseconds)
    enableFlagPolling: true, 
    flagsmithClientPollingIntervalMilliseconds: 5000, // Polls every 5 seconds
    onChange: (oldFlags, params) => {
        console.log('Flags updated', params)
    }
}

await flagsmith.init(flagsmithConfig)

export const allflags = flagsmith.hasFeature('refreshButton');
export const getFlagValue = () => flagsmith.hasFeature('refreshButton');

export const aicategorization = flagsmith.hasFeature('aicategorization');
export const allowregistration = flagsmith.hasFeature('allowregistration');
export const issuesperpage = flagsmith.hasFeature('issuesperpage');
export const showdifficulty = flagsmith.hasFeature('showdifficulty');
