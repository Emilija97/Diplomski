
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const upload = require('services/multer');
const router = Router();
// User Model
const { User } = require('models');

const createUserId = (user) => {
    return { ...user, id: user._id }
}
// @route   GET users
// @desc    Get All User
// @access  Public
router.get("/", async (req, res, next) => {
    try {
        console.log("Usao sam");
        const users = await User.find().lean().exec();

        // users.map(user => {
        //     const id = user._id;
        //     user.id = id.toString();
        //     delete user._id;
        // })

        const result = users.map(user => createUserId(user));
        result.forEach(user => delete user._id);
        return res.status(200).send(result);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

// @route   GET users/:id
// @desc    Get User with specific id
// @access  Public
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }).lean().exec();
        console.log(user._id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }


        // user.id = user._id.toString();
        // delete user._id;
        const result = createUserId(user);
        delete user._id;
        return res.status(200).json(result);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

// @route   POST users/upload/:id
// @desc    Update An User using ID and Upload Image
// @access  Public
router.post("/upload/:id", upload.single('image'), async (req, res, next) => {
    try {
        console.log("usao sam u post metodu");
        const { id } = req.params;
        const person = JSON.parse(req.body.data);
        let file;
        if (req.file) {
            file = req.file.filename;
            person.imageSrc = file;
        }

        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                ...person,
            }
        }, { new: true, useFindAndModify: false });

        if (!updatedUser) {
            return res.status(400).send({ message: responses(400) });
        }
        const result = createUserId(updatedUser);
        delete updatedUser._id;
        return res.status(200).json(result);

    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

// @route   PUT users/:id
// @desc    Update An Activity using ID
// @access  Public
router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...update } = req.body;

        console.log("usao sam u update");
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: {
                ...update,
            }
        }, { new: true, useFindAndModify: false });

        if (!updatedUser) {
            return res.status(400).send({ message: responses(400) });
        }
        const result = createUserId(updatedUser);
        delete updatedUser._id;
        return res.status(200).json(result);
        // return res.status(200).json({ data: updatedUser });
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});


module.exports = router;