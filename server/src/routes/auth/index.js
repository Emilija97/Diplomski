const {
    mail: { account },
} = require('config');
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const loginRequest = require('requests/auth/login');
const registerUserRequest = require('requests/auth/registerUser');
const changePasswordRequest = require('requests/auth/changePassword');
const { encrypt, comparePasswords, hashPassword } = require('services/auth');
const validate = require('middleware/validate');

const router = Router();
const createUserId = (user) => {
    return { ...user, id: user._id }
}
const { User } = require('models');

const responseWrongPass = res => res.status(400).send({ message: 'Invalid email/password.' });
const responseWrongPassword = res => res.status(400).send({ message: 'Wrong password.' });
const responseUserExists = res => res.status(400).send({ message: 'User already exists.' });
const responseUserCreated = res => res.status(200).send({ message: 'User successfully created' });
const responsePasswordChanged = res => res.status(200).send({ message: 'Password successfully changed' });

router.post('/login-user', validate(loginRequest), async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email }).lean().exec();

        if (!userExists) {
            return responseWrongPass(res);
        }
        if (!(await comparePasswords(password, userExists.password))) {
            return responseWrongPass(res);
        }

        delete userExists.password;
        const user = createUserId(userExists);
        delete userExists._id;

        return res.status(200).send({ user });

    } catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.post('/register-user', validate(registerUserRequest), async (req, res) => {
    try {

        const { fullName, email, password, type } = req.body;

        const userExists = await User.findOne({ email }).lean().exec();

        if (userExists) {
            return responseUserExists(res);
        }

        const user = new User({
            fullName,
            email,
            password: hashPassword(password),
            imageSrc: "profile.png",
            type,
        });

        await user.save();

        return responseUserCreated(res);
    } catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.put('/change-password', validate(changePasswordRequest), async (req, res) => {
    try {

        const { email, oldPassword, newPassword } = req.body;

        const userExists = await User.findOne({ email }).lean().exec();

        if (!(await comparePasswords(oldPassword, userExists.password))) {
            return responseWrongPassword(res);
        }

        const id = userExists._id;
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                ...userExists,
                password: hashPassword(newPassword)
            }
        }, { new: true, useFindAndModify: false });

        return responsePasswordChanged(res);
    } catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

module.exports = router;