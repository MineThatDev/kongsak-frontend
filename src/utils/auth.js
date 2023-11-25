export default function auth() {
    const checkLoginState = (callback) => {
        // eslint-disable-next-line no-undef
        FB.getLoginStatus((response) => {
          callback(response);
        });
      };
    return { checkLoginState };
  }
  