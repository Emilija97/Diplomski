const faker = require('faker');
const { User } = require('../../src/models/index');
const bcrypt = require('bcrypt');
ObjectId = require('mongodb').ObjectID;

const passwordHashSaltRounds = 10;

const userIds = [
    '569ed8269353e9f4c51617a3',
    '569ed8269353e9f4c51617a4',
    '569ed8269353e9f4c51617a5',
    '569ed8269353e9f4c51617a6',
];


module.exports = {
    up: async () => {
        const insertData = [];

        for (let i = 0; i < 4; i += 1) {

            const user = new User({
                _id: ObjectId(userIds[i]),
                id: `${i}`,
                fullName: faker.name.firstName() + " " + faker.name.lastName(),
                position: "",
                imageSrc: "",
                status: faker.random.arrayElement([1, 2, 3, 4]),
                type: faker.random.arrayElement([1, 2, 3, 4]),
                birthDate: "",
                homeAddress: faker.address.streetAddress(),
                enrolmentDate: "",
                email: `user${i}@test.com`,
                password: bcrypt.hashSync('test', passwordHashSaltRounds),
                phone: "",
                salary: '',
            });

            insertData.push(user.save());
        }

        await Promise.all(insertData);
    },
    down: async () => {
        await User.deleteMany();
    },
};
