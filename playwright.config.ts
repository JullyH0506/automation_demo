import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  expect: {
    toMatchSnapshot: {maxDiffPixels: 150}
  },

  retries: 1,
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        uploadToArgos: !!process.env.CI,
        //token: "argos_37230cdd30a9fbc8a9ffb5edca34be7d1a"
      }
    ],
    ['json', {outputFile: 'test-result/jsonReport.json'}],
    ['junit', {outputFile: 'test-result/junitReport.xml'}],
    //['allure-playwright'],
    ['html']
  ],

  use: {
    baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
    screenshot: "only-on-failure",
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
      baseURL: 'http://localhost:4200/'
      },
    },

    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'pageObjectFullScreen',
      testMatch: '001-usePageObjects.spec.ts',
      use: {
        viewport: {width: 1920, height: 1080}
      }
    },

    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
        //viewport: {width: 414, height: 880}
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 240000
  }
});
