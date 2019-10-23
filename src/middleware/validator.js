const { check, validationResult } = require('express-validator');

const validate = () => {
  const checkNameParts = () => {
    check('firstName').exists();
    check('secondName').exists();
    check('lastName').exists();
  };

  const checkEmailValidity = () => check('email')
    .exists()
    .isEmail()
    .withMessage('The e-mail is incorrect');

  const checkPasswordValidity = () => check('password')
    .exists()
    .isLength({ min: 5 })
    .withMessage('The password is too short! Should be at least 5 symbols!');

  return {
    validateSignUp: (User) => [
      checkNameParts(),
      checkPasswordValidity(),
      checkEmailValidity().custom(async (value, { req }) => {
        const user = await User(req.db).getUserByEmail(value);
        if (user) {
          return Promise.reject(new Error('E-mail already in use'));
        }
      }),
    ],
    validationResult: (req) => validationResult(req),
  };
};

module.exports = validate();
