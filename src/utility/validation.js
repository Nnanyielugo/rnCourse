const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch(rule) {
      case 'isEmail':
      // if there was another validation whose results sets isValid to false,
      // this result wouldn't then overrride that validation.
      // aka, take the previous validity and update the information
        isValid = isValid && emailValidator(val);
        break;
      case 'minLength':
        isValid = isValid && minLengthValidator(val, rules[rule]);
        break;
      case 'equalTo':
        isValid = isValid && equalToValidator(val, connectedValue[rule]);
        break;
      default:
        isValid = true;
    }
  }
  return isValid;
}

const emailValidator = val => {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val)
};

const minLengthValidator = (val, minLength) => {
  return val.length >= minLength;
}

const equalToValidator = (val, checkVal) => {
  return val === checkVal;
}

export default validate;