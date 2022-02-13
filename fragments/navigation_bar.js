const { I } = inject();

module.exports = {

  root: '//nav[@data-test="NavigationBar"]',
  item: (buttonName) => `${module.exports.root}//*[@data-test="${buttonName}"]`,

  menuList: {
    billing: 'a#header-link-billing',
  },

};
