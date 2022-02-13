const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'https://stage.my.osome.club/',
      show: true,
      windowSize: '1920×1080',
    },
    REST: {
      endpoint: 'https://stage.my.osome.club/',
    },
    ChaiWrapper: {
      require: 'codeceptjs-chai',
    },
  },
  include: {
    I: './steps_file.js',
    loginPage: './pages/login.js',
    billingPage: './pages/billing.js',
    authApi: './api/auth.js',
    navigationBar: './fragments/navigation_bar.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'osome-homework',
};
