const REGEX_PATTERNS = {
  NAME: /^[A-Za-z\s]+$/,
  NUMBER: /^[0-9]+$/,
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  MOBILE: /^[56789]\d{9}$/,
  PINCODE: /(^\d{6}$)/,
  ONLY_TEXT: /^[A-Za-z\s]+$/,
  CARD_EXPIRY: /^[0-9]{2}\/[0-9]{2}$/,
  REGEX_MOBILE_NO: /^\d{10}$/,
};

const FORM_ERROR_CODES: Record<string, string> = {
  NAME: 'Enter a valid name',
  PINCODE: 'Enter a valid pincode',
  ADDRESS: 'Enter a valid address',
  LANDMARK: 'Enter a valid landmark',
  CITY: 'Enter a valid city',
  STATE: 'Enter a valid state',
  EMAIL: 'Enter a valid email',
  MOBILE: 'Enter a valid mobile',
  CARD_EXPIRY: 'Enter a valid card expiry',
  CVV: 'Enter a valid card CVV',
  CARD_NUMBER: 'Enter a valid card number',
};

export { REGEX_PATTERNS, FORM_ERROR_CODES };
