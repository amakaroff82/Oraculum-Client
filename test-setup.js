import 'babel-polyfill';

// https://github.com/akiran/react-slick#test-setup
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    };
  };
