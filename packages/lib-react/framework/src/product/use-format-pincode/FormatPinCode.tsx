export const formatPinCode = (pinCode?: string, pin?: string) => {
  const getDefaultString = (val: string) => {
    return val.replace(/\D/g, '');
  };

  if (pinCode) {
    const value = getDefaultString(pinCode).replace(/^0+/, '');
    if (value.length === 3 && pin && pin.length === 5) {
      return value.substring(0, 3);
    } else if (value.length > 6 && value[0] !== '0') {
      return value.substring(0, 3) + '-' + value.substring(3, 6);
    } else if (value.length > 2) {
      return value.substring(0, 3) + '-' + value.substring(3, 6);
    } else {
      return value;
    }
  }
  return '';
};
