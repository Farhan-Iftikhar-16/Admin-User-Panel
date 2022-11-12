const ERROR_MESSAGES = {
  email: 'Please enter a valid email address',
  required: 'This field is required.',
  min: 'value too small',
  max: 'value too large',
  minlength: 'Value is too short',
  maxlength: 'Value is too big',
  passwordNotMatch: 'Password does not match',
  invalidPassword: 'Invalid Password'
};

const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER'
}

const GENDERS = [
  {label: 'Male', value: 'MALE'},
  {label: 'Female', value: 'FEMALE'},
  {label: 'Other', value: 'OTHER'},
]

const STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
}

const STATUS_VALUE_SET = [
  {label: 'All', value: 'ALL'},
  {label: 'Active', value: 'ACTIVE'},
  {label: 'Inactive', value: 'INACTIVE'}
]

const ROLES_SELECT_ITEM = [
  {label: 'Admin', value: 'ADMIN'},
  {label: 'Customer', value: 'CUSTOMER'}
]

const VALIDATION_PATTERNS = {
  PASSWORD: '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[`\\\'\\~!@#%$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?])[A-Za-z\\d*`\\\'\\~!@#%$%^&*()_+\\-=\\[\\]{};:"\\|,.<>\\/?]{8,}$'
}

export {
  ERROR_MESSAGES,
  ROLES,
  GENDERS,
  STATUS,
  STATUS_VALUE_SET,
  VALIDATION_PATTERNS,
  ROLES_SELECT_ITEM
};
