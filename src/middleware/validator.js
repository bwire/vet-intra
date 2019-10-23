const { check, validationResult } = require('express-validator');

const validate = () => {
  const checkEmailValidity = () => check('email')
    .exists()
    .isEmail()
    .withMessage('The e-mail is incorrect');

  const checkPasswordValidity = () => check('password')
    .exists()
    .isLength({ min: 5 })
    .withMessage('The password is too short! Should be at least 5 symbols!');

  const withValidationResult = (checks) => {
    checks.push((req, res, next) => {
      const errors = validationResult(req);
      return errors.isEmpty() ? next() : res.status(422).json({ errors: errors.array() });
    });
    return checks;
  };

  return {
    validateSignUp: (User) => withValidationResult([
      check('firstName').exists(),
      check('secondName').exists(),
      check('lastName').exists(),
      checkPasswordValidity(),
      checkEmailValidity().custom(async (value, { req }) => {
        const user = await User(req.db).getUserByEmail(value);
        if (user) {
          return Promise.reject(new Error('E-mail already in use'));
        }
      }),
    ]),
  };
};

module.exports = validate();
