const Joi = require('joi');
const seatsmanagement = require('../models/seats.model');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
Joi.objectId = require('joi-objectid')(Joi);

var tag = Joi.object().keys({
    _id: Joi.objectId().required()
});

var wall = Joi.object().keys({
    _id: Joi.string().required(),
    imageFile: Joi.string().required()
});

const seatsSchema = Joi.object({
    id: Joi.string().required(),
    left: Joi.string().required(),
    right: Joi.string().required(),
    status: Joi.string().required(),
    rank: Joi.string().required(),
    slug: Joi.string().required()
})

module.exports = {
    insert,
    listseats,
    listseatstotal,
    listAllseatstotal,
    addseats,
    getseats,
    deleteseats
}

async function deleteseats(req) {
    var id = req.params.id;
    // delete user['id'];
    // user = await Joi.validate(user, bannermanagementSchema, { abortEarly: false });
    return await seatsmanagement.remove({ _id: id })
}

async function updatebanner(user) {
    var id = user._id;
    delete user['_id'];
    user = await Joi.validate(user, seatsSchema, { abortEarly: false });
    return await seatsmanagement.update({ _id: id },
        user, { upsert: true }
    )
}

function addseats(req, res, callback) {
    console.log("Data Here Here "+req.body);
    if (req.body._id === '0') {
        delete req.body['_id'];
        insert(req.body).then(() => {
            callback({ error: 0, message: "Data has been submitted successsfully!" });
        }, err => {
            callback({ error: 1, message: err.message });
        });
    } else {

        updatebanner(req.body).then(() => {
            callback({ error: 0, message: "Data has been updated successsfully!" });
        }, err => {
            callback({ error: 1, message: err.message });
        });
    }
}

async function getseats(req) {
    console.log("Query Id : "+req.params.id);
    return await seatsmanagement.find({_id:req.params.id})
}

async function listseats(req) {
    var type = req.query.type;
    var offset = Number(req.query.offset);
    var search = req.query.search;
    var sortby = req.query.sortby;
    if (search != 'null') {
        return await seatsmanagement.find({ "id": { $regex: search, $options: 'i' } });
    } else {
        return await seatsmanagement.find({status:type}).sort({ createdAt: sortby }).skip(offset).limit(10);
    }
}
async function listseatstotal(req) {
    var type = req.query.status;
    return await seatsmanagement.find({status:type}).count();
}
async function listAllseatstotal() {
    return await seatsmanagement.count({});
}
async function insert(user) {
    user = await Joi.validate(user, seatsSchema, { abortEarly: false });
    return await new seatsmanagement(user).save();
}