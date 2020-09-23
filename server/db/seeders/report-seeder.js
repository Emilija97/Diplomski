const faker = require('faker');
const { Report, User } = require('../../src/models/index');
ObjectId = require('mongodb').ObjectID;

const reportsIds = [
    '569ed8269353e9f4c51617a7',
    '569ed8269353e9f4c51617a8',
    '569ed8269353e9f4c51617a9',
    '569ed8269353e9f4c51617b0',
    '569ed8269353e9f4c51617b4',
    '569ed8269353e9f4c51617b1',
    '569ed8269353e9f4c51617b2',
    '569ed8269353e9f4c51617b3',
]

const userId = '569ed8269353e9f4c51617a3';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]


module.exports = {
    up: async () => {
        const insertData = [];

        for (let i = 0; i < 8; i++) {

            const report = new Report({
                _id: ObjectId(reportsIds[i]),
                personId: await User.findById(userId),
                year: 2020,
                norm: faker.random.number({ min: 160, max: 180 }),
                hours: faker.random.number({ min: 120, max: 180 }),
                month: months[i]
            });

            insertData.push(report.save());
        }

        await Promise.all(insertData);
    },
    down: async () => {
        await Report.deleteMany();
    },
};
