const REGEX_PATTERNS: Record<string, RegExp | string> = {
  NAME: /^([a-zA-Z\s\.\'\-]*)$/,
  NUMBER: /^[0-9]+$/,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  MOBILE: /^[56789]\d{9}$/,
  PINCODE: /(^\d{6}$)/,
  ONLY_TEXT: /^[A-Za-z\s]+$/,
  CARD_EXPIRY: /^[0-9]{2}\/[0-9]{2}$/,
  REGEX_MOBILE_NO: /^\d{10}$/,
  REGEX_NAME: /^([a-zA-Z\s\.\'\-]*)$/,
  REGEX_EMAIL:
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+",
};

const VERIFY = 'verify';
const SIGN_UP_NOW_LINK = 'hopscotch://signup';
const SIGN_IN_MOBILE_LINK = 'hopscotch://signin-mobile';
const SIGN_IN_EMAIL_LINK = 'hopscotch://signin';
const SIGNIN = 'Sign in';
const SIGNUP = 'Join us';
const EMAILSIGNIN = 'emailSignIn';
const MOBILESIGNIN = 'mobileSignIn';
const VERIFICATION = 'Verification';
const ADD_MOBILE = 'AddMobile';
const REQUIRED = 'Required';

// const INVALID_EMAIL_MOBILE = 'Please enter valid Mobile/Email';

const FORM_ERROR_CODES: Record<string, string> = {
  NAME: 'Please enter valid Name',
  MOBILE: 'Enter a valid Mobile Number',
  EMAIL: 'Enter a valid Email Address',
};

export {
  SIGNIN,
  SIGNUP,
  VERIFY,
  REQUIRED,
  ADD_MOBILE,
  EMAILSIGNIN,
  VERIFICATION,
  MOBILESIGNIN,
  REGEX_PATTERNS,
  FORM_ERROR_CODES,
  SIGN_UP_NOW_LINK,
  SIGN_IN_EMAIL_LINK,
  SIGN_IN_MOBILE_LINK,
};
