const {
    check,
    validationResult
} = require('express-validator')

//Common

const scenarioStateUpdateValidationRules = () => {
    return [
        check('faculty_id', 'Invalid faculty ID.').not().isEmpty(),
    ]
}

const teamIDValidationRules = () => {
    return [
        check('team_id', 'Invalid team ID.').not().isEmpty().isNumeric().isLength({
            max: 3
        }),
    ]
}

// Admin Validation

const scenarioInputValidationRules = () => {
    return [
        check('faculty_id', 'Invalid faculty ID.').not().isEmpty(),
        check('funds', 'Funds array invalid.').isArray({
            min: 4
        }),
        check('times', 'Times array invalid.').isArray({
            min: 4
        }),
        check('funds.*', 'Invalid funds limit.').isNumeric().isLength({
            min: 1,
            max: 9
        }),
        check('times.*', 'Invalid time limit.').isNumeric().isLength({
            min: 1,
            max: 3
        }),
    ]
}

const changeLocationValidationRules = () => {
    return [
        check('f_id', 'Invalid faculty ID.').not().isEmpty(),
        check('f_loc', 'Invalid faculty location.').not().isEmpty(),
    ]
}

const scenarioStartValidationRules = () => {
    return [
        check('faculty_id', 'Invalid faculty ID.').not().isEmpty(),
        check('scenario_id', 'Invalid scenario ID.').not().isEmpty().isNumeric().isIn([1, 2, 3, 4]),
    ]
}

const resetDefaultPasswordValidationRules = () => {
    return [
        check('f_id', 'Invalid faculty ID.').not().isEmpty().isLength({
            max: 9
        }),
        check('f_t_id', 'Invalid team ID.').not().isEmpty().isNumeric(),
    ]
}

const updateTeamDetailsValidationRules = () => {
    return [
        check('f_id', 'Invalid faculty ID.').not().isEmpty().isLength({
            max: 9
        }),
        check('team_id', 'Invalid team ID.').not().isEmpty().isNumeric(),
        check('team_members', 'Invalid team members array.').isArray().isLength({
            min: 1
        })
    ]
}


const uploadTeamValidationRules = () => {
    return [
        check('faculty_id', 'Invalid faculty ID.').not().isEmpty(),
        check('team_data', 'Invalid team data.').isArray(),
        check('team_data.*.team_id', 'Invalid team ID.').isNumeric().isLength({
            max: 3
        }),
        //check('team_data.*.emp_id', 'Invalid participant ID.').isNumeric().isLength({ max: 10 }),
        check('team_data.*.name', 'Invalid participant name.').not().isEmpty().isLength({
            max: 50
        }),
        //check('team_data.*.role', 'Invalid participant role.').not().isEmpty().isLength({ max: 30 }),
        //check('team_data.*.location', 'Invalid participant location.').not().isEmpty().isLength({ max: 30 }),
    ]
}

// Auth Validation

const loginValidationRules = () => {
    return [
        check('f_t_id', 'Invalid login ID.').not().isEmpty(),
        check('role', 'Invalid role.').isNumeric().isLength({
            min: 1,
            max: 1
        }).isIn(["0", "1"]),
        check('password', 'Invalid password.').exists(),
    ]
}

// Feedback Submission Validation 

const submitScenario5ValidationRules = () => {
    return [
        check('team_id', 'Invalid team ID.').isNumeric().isLength({
            max: 3
        }),
        check("tempDict.1", 'Invalid array for question 1.').isArray({
            min: 4,
            max: 4
        }),
        check("tempDict.1.*", 'Invalid value for question 1 rating.').isIn([1, 2, 3]),
        check("tempDict.2", 'Invalid array for question 2.').isArray({
            min: 4,
            max: 4
        }),
        check("tempDict.2.*", 'Invalid value for question 2 rating.').isIn([1, 2, 3]),
        check("tempDict.3", 'Invalid array for question 3.').isArray({
            min: 4,
            max: 4
        }),
        check("tempDict.3.*", 'Invalid value for question 3 rating.').isIn([1, 2, 3]),
        check("tempDict.4", 'Invalid value for question 4.').isNumeric().isIn([1, 2, 3]),
        check("tempDict.5", 'Invalid value for question 5.').isNumeric().isIn([1, 2, 3])
    ]
}


const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({
        [err.param]: err.msg
    }))

    return res.status(422).json({
        status: "FAIL",
        errors: extractedErrors,
    })
}

module.exports = {
    scenarioStateUpdateValidationRules,
    scenarioInputValidationRules,
    changeLocationValidationRules,
    resetDefaultPasswordValidationRules,
    scenarioStartValidationRules,
    uploadTeamValidationRules,
    updateTeamDetailsValidationRules,

    loginValidationRules,

    teamIDValidationRules,

    submitScenario5ValidationRules,

    validate,
}