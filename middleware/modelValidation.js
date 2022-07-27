const { check, validationResult } = require(`express-validator`);

exports.validateUserModel = [
  check(`name`)
    .notEmpty()
    .withMessage(`Please Enter Name`)
    .matches(/^[a-zA-Z ]*$/)
    .withMessage(`Please Use Only Alphabets`),

  check(`gender`)
    .notEmpty()
    .withMessage(`Please Enter Gender`)
    .matches(/\b(?:Male|Female|Other)\b/)
    .withMessage(`Please Enter Correct Gender`),

  check(`roleID`)
    .notEmpty()
    .withMessage(`Please Enter Role ID`)
    .matches(/\b(?:1|2|3|4)\b/)
    .withMessage(`Please Enter Correct Role ID`),

  check(`phoneNumber`)
    .notEmpty()
    .withMessage(`Please Enter Phone Number`)
    .isLength({ min: 10, max: 10 })
    .withMessage(`Please Enter 10 Digit Phone Number`)
    .isMobilePhone()
    .withMessage(`Please Enter Correct Phone Number`),

  check(`email`)
    .notEmpty()
    .withMessage(`Please Enter An Email`)
    .trim()
    .isEmail()
    .withMessage(`Please Enter A Valid Email`),

  check(`password`)
    .trim()
    .notEmpty()
    .withMessage(`Please Enter Password`)
    .isLength({ min: 8, max: 20 })
    .withMessage(`Password Must Be 8 To 20 Characters`)
    .matches(`[A-Z]`)
    .withMessage(`One Uppercase Letter Required`)
    .matches(`[a-z]`)
    .withMessage(`One Lowercase Letter Required`)
    .matches(`[0-9]`)
    .withMessage(`One number is required`)
    .matches(/[-._!``"'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/)
    .withMessage(`One Special Character Required`),
];

exports.validation = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};
