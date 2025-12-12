import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker';
import { argosScreenshot } from "@argos-ci/playwright"

test.beforeEach(async({page}) => {
    await page.goto('/');
})

test('navigate to form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage()
})

test('parameterized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome', 'Option 1')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
    //await pm.navigateTo().datePickerPage();
    //await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
    //await pm.onDatepickerPage().selectDatepickerRangeFromToday(6, 15)
})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, 'form layout page')
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, 'datepicker page')
})