export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters
  return password && password.length >= 8;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return value && value.length <= maxLength;
};

export const validateMatch = (value1, value2) => {
  return value1 === value2;
};

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return phone && re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const rule = rules[field];

    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field.replace('_', ' ')} is required`;
    } else if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    } else if (rule.password && value && !validatePassword(value)) {
      errors[field] = 'Password must be at least 8 characters';
    } else if (rule.minLength && value && !validateMinLength(value, rule.minLength)) {
      errors[field] = `Must be at least ${rule.minLength} characters`;
    } else if (rule.maxLength && value && !validateMaxLength(value, rule.maxLength)) {
      errors[field] = `Must be no more than ${rule.maxLength} characters`;
    } else if (rule.match && value !== formData[rule.match]) {
      errors[field] = `Does not match ${rule.match.replace('_', ' ')}`;
    }
  });

  return errors;
};