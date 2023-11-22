import { Page, expect } from '@playwright/test';

export default class SignInPage {
  constructor(public page: Page) {}

  /**
    Define the main actions in the page as methods.
  */

  async createUser(username: string, email: string, password: string) {
    await this.signUpButton();
    await this.enterUsername(username);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.signInButton();
  }

  async verifyHomePage(isSuccess: boolean = true) {
    await expect(this.page.locator('a.navbar-brand')).toBeVisible();
    await expect(
      this.page.locator("//a[contains(text(),'Home')]")
    ).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: 'Your Feed' })
    ).toBeVisible();
  }

  async signIn(username: string, password: string) {
    await this.signInPageAccess();
    await this.enterUsernameSignIn(username);
    await this.enterPasswordSignIn(password);
    await this.signInButton();
    await expect(this.page.locator('ul.error-messages')).toBeVisible();
  }

  async verifySignIn(isSuccess: boolean = true) {
    if (isSuccess) {
      await expect(this.page.locator('ul.error-messages')).not.toBeVisible();
    } else {
      await expect(this.page.locator('ul.error-messages')).toBeVisible();
    }
  }

  /**
    Define the locator property
  */

  /**
    Define the page actions
  */
  async signUpButton() {
    await this.page.locator("//a[contains(text(),'Sign up')]").click();
  }

  async enterUsername(username: string) {
    await this.page.locator("input[placeholder='Username']").fill(username);
  }

  async enterEmail(email: string) {
    await this.page.locator("input[placeholder='Email']").fill(email);
  }

  async enterPassword(password: string) {
    await this.page.locator("input[placeholder='Password']").fill(password);
  }

  async signInButton() {
    await this.page.locator("button[type='submit']").click();
  }

  async signInPageAccess() {
    await this.page.locator("//a[contains(text(),'Sign in')]").click();
  }

  async enterUsernameSignIn(username: string) {
    await this.page.locator("input[type='email']").fill(username);
  }

  async enterPasswordSignIn(password: string) {
    await this.page.locator("input[type='password']").fill(password);
  }
}
