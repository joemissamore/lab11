/**
 * Created by Joe on 11/21/16.
 */

var express = require('express');
var router = express.Router();
var address_dal = require('../model/address_dal');

// View all adresses
router.get('/all', function(req, res) {
    address_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('address/addressViewAll', {
                'result':result });
        }
    });
});

// View the address for the given id
router.get('/', function(req ,res){
    if (req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.getById(req.query.address_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.render('address/addressViewById', {'result':result});
            }

        });
    }
});

// Return the addd a new school form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    address_dal.getAll(function(err, result){
        if (err) {
            res.send(err)
        }
            else {
                res.render('address/addressAdd', {'address': result});
            }
    });
});

// Insert a school record
router.get('/insert', function(req, res){
    // simple validation
    if (req.query.street == null) {
        res.send('A street name must be provided.');
    }
    else if (req.query.zip_code == null) {
        res.send ('A zip code must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        address_dal.insert(req.query, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                // poor practice but we will handle it differently once we start using AJAX
                res.redirect(302, '/address/all');
            }
        });
    }
});

// Delete a school from the given school_id
router.get('/delete', function(req, res){
    if (req.query.address_id == null) {
        res.send('address_id is null');
    }
    else {
        address_dal.delete(req.query.address_id, function(err, result){
            if (err) {
                res.send(err);
            }
            else {
                // again this is poor practice but will be handled differently when we tart using AJAX
                res.redirect(302, '/address/all');
            }
        });
    }
});

module.exports = router;