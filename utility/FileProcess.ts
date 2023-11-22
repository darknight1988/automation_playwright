import { Page } from '@playwright/test';

export default class FileProcess {
  constructor(public page: Page) {}
  async downloadFile(locator: string) {
    const downloadPromise = this.page.waitForEvent('download');
    await this.page.locator(locator).click();
    const download = await downloadPromise;
    const fileName = download.suggestedFilename();
    await download.saveAs('download/' + fileName);
    return fileName;
  }
}
