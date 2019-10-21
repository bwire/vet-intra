const { check, body, validationResult } = require('express-validator');

const validate = () => {
  const checkEmailValidity = () => check('email').isEmail()
    .withMessage('The e-mail is incorrect');

  const checkForExistingEmail = (users) => body('email').custom(async (value) => {
    const user = await users.getUserByEmail(value);
    if (user) {
      return Promise.reject(new Error('E-mail already in use'));
    }
  });

  const checkPasswordValidity = () => check('password').isLength({ min: 5 })
    .withMessage('The password is too short! Should be at least 5 symbols!');

  return {
    validateSignUp: () => [
      checkEmailValidity(),
      checkPasswordValidity(),
    ],
    checkForExistingEmail,
    result: (req) => validationResult(req),
  };
};

module.exports = validate();
