
const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const upload = require('services/multer');
const router = Router();

const responseUserExists = res => res.status(400).send({ message: 'User already exists.' });
// User Model
const { User } = require('models');

const createUserId = (user) => {
    return { ...user, id: user._id }
}

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find().lean().exec();

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

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id }).lean().exec();

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

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

router.post("/upload/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), async (req, res, next) => {
    try {
        const { id } = req.params;
        const person = JSON.parse(req.body.data);

        if (req.files['image']) {
            const image = req.files['image'][0];
            person.imageSrc = image.filename;
        }

        if (req.files['cv']) {
            const cv = req.files['cv'][0];
            person.cv = cv.filename;
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

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const { ...update } = req.body;

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
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.get("/name/:fullName", async (req, res, next) => {
    try {
        const { fullName } = req.params;

        if (fullName) {
            console.log(fullName);
            const regex = new RegExp(`^.*${fullName}.*$`, 'i');
            const users = await User.find({ fullName: { $in: regex } }).lean().exec();
            const result = users.map(user => createUserId(user));
            result.forEach(user => delete user._id);
            return res.status(200).json(result);
        }
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const _id = ObjectId(id);
        const user = await User.findOne({ _id }).lean().exec();


        if (!user) {
            return res.status(404).send({ message: 'Activity not found' });
        }

        await User.deleteOne({ _id: id }).lean().exec();

        return res.status(200).json(user);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.post("/", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), async (req, res) => {
    try {
        const data = JSON.parse(req.body.data);
        const email = data.email;
        const userExists = await User.findOne({ email }).lean().exec();
        if (userExists) {
            return responseUserExists(res);
        }

        if (req.files['image']) {
            const image = req.files['image'][0];
            data.imageSrc = image.filename;
        }

        if (req.files['cv']) {
            const cv = req.files['cv'][0];
            data.cv = cv.filename;
        }

        const user = new User({
            ...data
        });

        await user.save();

        if (!user) {
            return res.status(400).send({ message: responses(400) });
        }
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


module.exports = router;