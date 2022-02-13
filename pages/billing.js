const { I } = inject();

module.exports = {
  url: '/billing/payment',

  activeProduct: (name, dueDate) => `//div[./span[contains(text(), "Active Products")]]//*[@data-testid="info-panel"][.//span[contains(text(),"${name}")]][.//span[contains(text(),"${dueDate}")]]`,

  subscriptionInfo: {
    root: (name) => `//div[@data-testid="subscription-info"][.//h3[contains(text(),"${name}")]]`,

    fields: {
      cardNumber: '//div[./p[contains(text(), "Payment method")]]//text()[3]',
      paymentMethod: '//div[./p[contains(text(), "Payment method")]]//span',

    },

    buttons: {
      changePaymentsMethod: '//button[@data-testid="payment-method::change-payment-method"]',
    },
    async assertPaymentMethodEqual(expected) {
      I.waitForElement(this.fields.paymentMethod, 5);
      const paymentMethod = await I.grabTextFrom(this.fields.paymentMethod);
      I.assertContain(paymentMethod, expected);
    },
  },

  paymentMethodModal: {
    root: '//div[./h1[contains(text(), "Choose default payment method")]]',

    buttons: {
      change: '//button[contains(text(), "Change")]',
      addNewCard: '//button[contains(text(), "Add new card")]',
    },

    options: {
      card: '//span[contains(text(), "Credit or debit card")]',
      bankTransfer: '//label/span[contains(text(), "Bank transfer")]',
    },

    async findCardByNumber(expectedNumber) {
      const cardNumberInfo = await I.grabTextFrom();
      I.assertEqual(newCardNumber.slice(-4), cardNumberInfo);
    },
  },

  addNewCardModal: {
    buttons: {
      save: '//button[contains(text(), "Save")]',
    },
    fields: {
      cardNumber: 'form#stripe-form',
    },

    // addNewCard
  },

  openChangeMethodModal(subscriptionName, dueOnDate) {
    I.waitForElement(this.activeProduct(subscriptionName, dueOnDate), 5);
    I.click(this.activeProduct(subscriptionName, dueOnDate));
    I.waitForElement(this.subscriptionInfo.root(subscriptionName), 5);
    I.forceClick(this.subscriptionInfo.buttons.changePaymentsMethod);
    I.waitForElement(this.paymentMethodModal.root, 5);
  },
};
