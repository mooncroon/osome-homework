Feature('Control payment methods');

let phoneNumber = '93-12-351-235',
    code = '1235',
    subscriptionName = 'Bonanza — Yearly',
    dueOnDate = 'Due on 27 Mar 2022';

Before(({ I, loginPage, navigationBar, billingPage}) => {
    I.amOnPage(loginPage.url);
    loginPage.loginForm.loginByPhone(phoneNumber, code);
    I.waitInUrl('/companies/', 5);
    I.click(navigationBar.item('SettingsButton'));
    I.click(navigationBar.menuList.billing);
    I.waitInUrl(billingPage.url, 5);
    I.waitForElement(billingPage.activeProduct(subscriptionName, dueOnDate), 5);
    I.click(billingPage.activeProduct(subscriptionName, dueOnDate));
    I.waitForElement(billingPage.subscriptionInfo.root(subscriptionName), 5);
    I.forceClick(billingPage.subscriptionInfo.buttons.changePaymentsMethod);
    I.waitForElement(billingPage.paymentMethodModal.root, 5);
    I.waitForClickable(billingPage.paymentMethodModal.options.card, 5);
    I.forceClick(billingPage.paymentMethodModal.options.card)
    I.forceClick(billingPage.paymentMethodModal.buttons.change);
    I.refreshPage();
 });

Scenario('Change payments method', async ({ I, billingPage }) => {
        // 1.При изменении метода оплаты выбранный метод сохраняется
        // 1.1.С Credit or debit card на Bank transfer
        billingPage.openChangeMethodModal(subscriptionName, dueOnDate)
        I.waitForClickable(billingPage.paymentMethodModal.options.bankTransfer, 5);
        I.forceClick(billingPage.paymentMethodModal.options.bankTransfer)
        I.forceClick(billingPage.paymentMethodModal.buttons.change);
        I.refreshPage();
        I.waitForElement(billingPage.activeProduct(subscriptionName, dueOnDate), 5);
        I.click(billingPage.activeProduct(subscriptionName, dueOnDate));
        await billingPage.subscriptionInfo.assertPaymentMethodEqual('Bank transfer')
        I.refreshPage();

        // 1.2.C Bank transfer на Credit or debit card
        billingPage.openChangeMethodModal(subscriptionName, dueOnDate)
        I.waitForClickable(billingPage.paymentMethodModal.options.card, 5);
        I.forceClick(billingPage.paymentMethodModal.options.card)
        I.forceClick(billingPage.paymentMethodModal.buttons.change);
        I.refreshPage();
        I.waitForElement(billingPage.activeProduct(subscriptionName, dueOnDate), 5);
        I.click(billingPage.activeProduct(subscriptionName, dueOnDate));
        await billingPage.subscriptionInfo.assertPaymentMethodEqual('Mastercard')
});

// Scenario('Change payments method', async ({ I, billingPage }) => {

//     // //billingPage.paymentMethodModal.checkOption('Bank transfer');
//     // I.click(billingPage.paymentMethodModal.buttons.addNewCard)
//     // I.waitForElement(billingPage.addNewCardModal.fields.cardNumber, 5);
//     // pause();
//     // //I.type(newCardNumber);
//     // //I.type(expiryDate);
//     // //I.type(cvc)

//     // I.click(billingPage.addNewCardModal.buttons.save)
//     // I.seeElement(billingPage.paymentMethodModal.root)
//     // billingPage.paymentMethodModal.findCardByNumber(newCardNumber)

// });




