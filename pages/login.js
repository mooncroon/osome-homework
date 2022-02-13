const { I } = inject();

module.exports = {
  url: 'https://stage.my.osome.club/',

  loginForm: {
    fields: {
      phoneNumber: 'input[name=phone]',
      smsCode: 'input[data-testid="LoginCode"]',
    },

    buttons: {
      signIn: '//button[contains(text(), "SIGN IN")]',
      continue: '//button[contains(text(), "Continue")]',

    },
    // countrySelector: {
    //   button: 'div[data-test-id=src_reacttelephoneinput_test_id_7]',
    //   countryList: '//div[@class="country-list"]',
    //   countryElement: (country) =>  `${module.exports.loginForm.countrySelector.countryList}//div[contains(@title,"${country}")]`,

    //   selectCountry(countryTitle) {
    //     I.click(this.button);
    //     I.waitForElement(this.countryList)
    //     I.scrollTo(this.countryElement(countryTitle))
    //     I.click(this.countryElement(countryTitle))
    //   }
    // },

    loginByPhone(phoneNumber, code) {
      I.seeElement(this.fields.phoneNumber);
      I.fillField(this.fields.phoneNumber, phoneNumber);
      I.click(this.buttons.signIn);
      I.waitForElement(this.fields.smsCode, 5);
      I.fillField(this.fields.smsCode, code);
      I.click(this.buttons.continue);
    },
  },

};
