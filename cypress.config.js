const { defineConfig } = require("cypress");
const puppeteer = require('puppeteer');


let localhost;
const host = 'http://localhost:';

module.exports = defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {
        family: 'chromium',
        isHeadless: false
      }, launchOptions) => {

        if (browser.name !== 'electron'
          || browser.name === 'chromium'
          || browser.name === 'edge'
          //|| browser.name === 'firefox'
        ) {
          launchOptions.preferences.default['preference'] = true;
          launchOptions.args.push('--start-fullscreen');
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--no-sandbox');
          launchOptions.args.push("--incognito");


          localhost = `${host}${launchOptions.args.find(arg => arg.includes('--remote-debugging-port=')).split('=')[1]}`;
        }
        if (browser.name === 'electron') {
          launchOptions.preferences.darkTheme = true;
          launchOptions.preferences.devTools = true;
          launchOptions.preferences.fullscreen = true;
          localhost = launchOptions.preferences.proxyUrl;

        }
      });
      on('task',
        {
          async loginSSO() {
            const browser = await puppeteer.connect({
              browserURL: localhost,
              headless: false,
              slowmo: 250,
              ignoreHTTPSErrors: true,
              args: ['--no-sandbox', '--disable-setuid-sandbox']
            });

            const page = await browser.newPage();

            await page.goto('https://login.microsoftonline.com/');
            await page.evaluate(() => localStorage.clear());
            await page.evaluate(() => sessionStorage.clear());
            await page.deleteCookie();
            console.log('Limpando os cokkies, storage e session');

            await page.waitForSelector('[name="loginfmt"]');
            await page.type('[name="loginfmt"]', process.env.LOGIN_USER_CORA);
            console.log('Informando o e-mail');

            await page.screenshot({
              path: 'cypress/downloads/email.png', fullPage: true
            });

            await page.click('[type="submit"]');
            console.log('Avançando com o e-mail');

            await delay(5 * 1000);
            await page.waitForSelector('[name="passwd"]');
            await page.type('[name="passwd"]', process.env.PASSWORD_USER_CORA);
            console.log('Informando a senha');

            await page.screenshot({
              path: 'cypress/downloads/senha.png', fullPage: true
            })
            await page.waitForSelector('#displayName');
            await page.click('[type="submit"]');
            console.log('Avançando com a senha');

            await page.waitForSelector('[data-report-event="Signin_Submit"]');
            console.log('esperar o [data-report-event="Signin_Submit"]');
            await page.click('[data-report-event="Signin_Submit"]');
            //console.log('Realizando login');
            console.log('Finalizado');
            //await page.waitForSelector('[type="search"]');
            console.log('before waiting');
            await delay(15 * 1000);
            console.log('after waiting');
            await page.screenshot({
              path: 'cypress/downloads/tela.png', fullPage: true
            })

            const loginData = await page.evaluate(() => {
              const tokenId = localStorage.getItem('@cross/data');
              // const tokentExpiry = localStorage.getItem('');
              console.log(`tokenID: ${tokenId}`);
              return { tokenId }
            })

            await page.close();
            return loginData;
          },
        }
      );
      function delay(time) {
        return new Promise(function (resolve) {
          setTimeout(resolve, time)
        });
      }

    },
    specPattern: "cypress/e2e/**/*.js",
    baseUrl: 'https://cora-stg.ambevdevs.com.br/',
    includeShadowDom: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 20000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: "cypress/reports/junit.[hash].xml",
      charts: true,
      configFile: "reporterOpts.json",
      reportDir: "cypress/reports",
      toConsole: true
    },
    retries: 0,
    pageLoadTimeout: 200000,
    screenshotOnRunFailure: true,
    scrollBehavior: 'nearest',
    chromeWebSecurity: false,
    video: true,
  },
});