const express = require('express');
const passport = require('passport');
const seatsmanagementCtrl = require('../controllers/seats.controller');
const router = express.Router();
module.exports = router;

router.post('/uploadseats', passport.authenticate('jwt', { session: false }), uploadseats);
router.get('/listseats', passport.authenticate('jwt', { session: false }), listseats);
router.get('/listseatstotal', passport.authenticate('jwt', { session: false }), listseatstotal);
router.get('/listAllseatstotal', passport.authenticate('jwt', { session: false }), listAllseatstotal);
router.get('/getseats/:id', passport.authenticate('jwt', { session: false }), getseats);
router.post('/addseats', passport.authenticate('jwt', { session: false }), addseats);
router.get('/delete/:id', passport.authenticate('jwt', { session: false }), deleteseats);
 
/* DELETE Blog */
function deleteseats(req, res) {
    console.log("delete Seats" + req.params.id);
    seatsmanagementCtrl.deleteseats(req).then((data) => {
        res.json({ error: 0, message: "success", data: data });
    }, err => {
        console.log('err', err.message)
        res.json({ error: 1, message: err.message });
    });
}

function getseats(req, res) {
    seatsmanagementCtrl.getseats(req).then((data) => {
        res.json({ error: 0, message: "success", data: data });
    }, err => {
        console.log('err', err.message)
        res.json({ error: 1, message: err.message });
    });
}

function addseats(req, res) {
    console.log(req);
    seatsmanagementCtrl.addseats(req, res, function(data) {
        console.log('uploadpic', data)
        if (data.error) {
            res.json(data);
        } else {
            res.json(data)
        }
    })
}

function listseats(req, res) {
    seatsmanagementCtrl.listseats(req).then((data) => {
        res.json({ error: 0, message: "success", data: data });
    }, err => {
        console.log('err', err.message)
        res.json({ error: 1, message: err.message });
    });
}
function listseatstotal(req,res) {
    seatsmanagementCtrl.listseatstotal(req).then((data) => {
        res.json({ error: 0, message: "success", data: data });
    }, err => {
        console.log('err', err.message)
        res.json({ error: 1, message: err.message });
    });
}

function listAllseatstotal(req,res) {
    seatsmanagementCtrl.listAllseatstotal().then((data) => {
        res.json({ error: 0, message: "success", data: data });
    }, err => {
        console.log('err', err.message)
        res.json({ error: 1, message: err.message });
    });
}
function uploadseats(req, res) {
    seatsmanagementCtrl.insert(req.body).then(() => {
        console.log('meow');
        res.json({ error: 0, message: "Data has been submitted successsfully!" });
    }, err => {
        console.log('err', err.message)
        res.json({ error: 1, message: err.message });
    });
}