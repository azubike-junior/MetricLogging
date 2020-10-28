const { check, validationResult } = require('express-validator');

const validateMetric = [
    check('visitor')
        .trim()
        .isInt()
        .isLength({ min: 1 })
        .withMessage('number of visitors who checked it must be an integer'),
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array()
                })
            }
            return next();
        }
]

module.exports = validateMetric