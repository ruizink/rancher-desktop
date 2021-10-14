import path from 'path';
import { platform } from 'os';
import { exec } from 'child_process';
import { setTimeout } from 'timers';
import { Application } from 'spectron';
const electronPath = require('electron');

export class TestUtils {
  public app: Application | undefined;

  public setUp() {
    this.app = new Application({
      path:             electronPath as any,
      args:             [path.join(__dirname, '../../')],
      chromeDriverArgs: [
        '--no-sandbox',
        '--whitelisted-ips=',
        '--disable-dev-shm-usage',
      ],
      webdriverLogPath: './'
    });

    return this.app.start();
  }

  /**
   * soft App stop
   */
  public async tearDown() {
    if (this.app && this.app.isRunning()) {
      await this.app.stop();
    } else {
      console.log('Something went wrong during stop process.');
    }
  }

  /**
   * Set jest command timeout based on env
   */
  public setupJestTimeout() {
    const jestCiTimeout = 60000;
    const jestDevTimeout = 30000;

    if (process.env.CI) {
      jest.setTimeout(jestCiTimeout);
    } else {
      jest.setTimeout(jestDevTimeout);
    }
  }
}
