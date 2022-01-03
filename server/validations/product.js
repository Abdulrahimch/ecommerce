const { check, validationResult } = require("express-validator");

exports.validateCreateProduct = [
  check("title", "Please enter the title").not().isEmpty(),
  check("desc", "Please enter a description").not().isEmpty(),
  check("img", "Please upload the image").not().isEmpty(),
  check("size", "Please enter the size").not().isEmpty(),
  check("color", "Please enter the color").not().isEmpty(),
  check(
    "price",
    "Please enter a valid price"
  ).isNumeric(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  }
];
