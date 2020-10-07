const Router = require('services/modelBindings');
const logger = require('services/logger');
const responses = require('services/responses');
const createRequest = require('requests/leave-request/create');
const validate = require('middleware/validate');

const router = Router();
const createRequestId = (request) => {
    return { ...request, id: request._id }
}
const { Request } = require('models');

const responseWrongPass = res => res.status(400).send({ message: 'Invalid email/password.' });

router.get("/", async (req, res, next) => {
    try {
        const requests = await Request.find().lean().exec();

        const result = requests.map(request => createRequestId(request));
        result.forEach(request => delete request._id);
        return res.status(200).send(result);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

router.post("/", validate(createRequest), async (req, res) => {
    try {
        const { ...attributes } = req.body;

        const request = new Request({
            ...attributes
        });

        const savedRequest = await request.save((request._id));

        if (!savedRequest) {
            return res.status(400).send({ message: responses(400) });
        }

        const result = createRequestId(savedRequest);
        delete savedRequest._id;
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

        const _id = ObjectId(id);
        const updatedRequest = await Request.findByIdAndUpdate(_id, {
            $set: {
                ...update,
            }
        }, { new: true, useFindAndModify: false });

        if (!updatedRequest) {
            return res.status(400).send({ message: responses(400) });
        }

        return res.status(200).send({ data: updatedRequest });
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
        const request = await Request.findOne({ _id: id }).lean().exec();

        if (!request) {
            return res.status(404).send({ message: 'Request not found' });
        }

        const result = createRequestId(request);
        delete request._id;
        return res.status(200).json(result);
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
        const request = await Request.findOne({ _id }).lean().exec();


        if (!request) {
            return res.status(404).send({ message: 'Request not found' });
        }

        await Request.deleteOne({ _id: id }).lean().exec();

        return res.status(200).json(request);
    }
    catch (e) {
        logger.error(e);
        return res.status(500).send({
            message: responses(500),
        });
    }
});

module.exports = router;