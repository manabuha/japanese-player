const testsDir = 'dist_tests';

module.exports = (config) => {
    config.set({
        basePath: '',

        frameworks: [
            'mocha',
            'source-map-support',
        ],

        plugins: [
            'karma-mocha',
            'karma-source-map-support',
            'karma-yandex-launcher',
        ],

        files: [
            {
                pattern: `${testsDir}/*.js`,
            },
        ],

        port: 9876,

        colors: true,

        autoWatch: false,

        browsers: ['YandexCustom'],
        customLaunchers: {
            YandexCustom: {
                base: 'Yandex',
                flags: [
                    '--disable-background-timer-throttling',
                    '--disable-device-discovery-notifications',
                    '--ignore-connections-limit=localhost',
                    '--disable-renderer-backgrounding',
                    '--disable-backgrounding-occluded-windows',
                ],
            },
        },

        browserNoActivityTimeout: 90000,

        singleRun: true,

        concurrency: Infinity,

        browserDisconnectTolerance: 10,

        client: {
            mocha: {
                timeout: 50000,
            },
        },
    });
};
