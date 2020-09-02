const mongo = require("mongoose");

const people = mongo.Schema({
    id: String,
    fullName: String,
    imageSrc: String,
    position: String,
    status: Number,
    type: Number,
    birthDate: String,
    homeAddress: String,
    enrolmentDate: String,
    email: String,
    phone: String,
    salary: String
}, {
    collection: "people"
});
people.index({ "$**": "text" }); //We need $text option for search

module.exports = mongo.model("People", people, "people");
