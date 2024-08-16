import { test as setup } from '@playwright/test';
import { LogInPage } from './page-objects/log-in-page';

const firstTestUserFile = 'playwright/.auth/first_test_user.json';

setup('authenticate as first_test_user@test.test', async ({ page }) => {
  const logInPage = new LogInPage(page);
  await logInPage.goto();
  await logInPage.logIn('first_test_user@test.test', 'first_test_user_password');
  await page.context().storageState({ path: firstTestUserFile });
});

const secondTestUserFile = 'playwright/.auth/second_test_user.json';

setup('authenticate as second_test_user@test.test', async ({ page }) => {
  const logInPage = new LogInPage(page);
  await logInPage.goto();
  await logInPage.logIn('second_test_user@test.test', 'second_test_user_password');
  await page.context().storageState({ path: secondTestUserFile });
});

const thirdTestUserFile = 'playwright/.auth/third_test_user.json';

setup('authenticate as third_test_user@test.test', async ({ page }) => {
  const logInPage = new LogInPage(page);
  await logInPage.goto();
  await logInPage.logIn('third_test_user@test.test', 'third_test_user_password');
  await page.context().storageState({ path: thirdTestUserFile });
});

const fourthTestUserFile = 'playwright/.auth/fourth_test_user.json';

setup('authenticate as fourth_test_user@test.test', async ({ page }) => {
  const logInPage = new LogInPage(page);
  await logInPage.goto();
  await logInPage.logIn('fourth_test_user@test.test', 'fourth_test_user_password');
  await page.context().storageState({ path: fourthTestUserFile });
});