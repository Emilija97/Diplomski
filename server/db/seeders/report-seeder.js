const faker = require('faker');
const { Report } = require('../../src/models/index');
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

const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'
]


module.exports = {
    up: async () => {
        const insertData = [];

        for (let i = 0; i < 8; i++) {

            const report = new Report({
                _id: ObjectId(reportsIds[i]),
                id: `${i}`,
                personId: '0',
                year: 2020,
                norm: 160,
                hours: faker.random.number(120, 180),
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
