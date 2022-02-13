const { I } = inject();

module.exports = {

  urls: {
    sendCode: 'https://stage.my.osome.club/api/v2/auth/sms/send_code',
    login: 'https://stage.my.osome.club/api/v2/auth/sms/login',
  },

  sendCode(phoneNumber) {
    return I.sendPostRequest(this.sendCodeUrl, { phoneNumber: `${phoneNumber}` });
  },

  login(smsCode, token) {
    return I.sendPostRequest(this.loginUrl, { code: `${smsCode}`, verificationToken: `${token}` });
  },

  auth(phoneNumber, smsCode) {
    const sendCodeResp = this.sendCode(phoneNumber);
    this.login(smsCode, sendCodeResp.data.payload.verificationToken);
  },
};
