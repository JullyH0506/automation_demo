import {test} from '../test-options'
import {faker} from '@faker-js/faker';

//test.beforeEach(async({page}) => {
//   await page.goto('/');
//})

test('parameterized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    //await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome', 'Option 1')
    await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true);
})