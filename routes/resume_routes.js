/**
 * Created by Joe on 11/17/16.
 */
var express = require('express');
var router = express.Router();
var resume_dal = require('../model/resume_dal');
var account_dal = require('../model/account_dal');


// View All resumes
// WHATS UP WITH /all
router.get('/all', function(req, res) {
    resume_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeViewAll', { 'result':result });
        }
    });

});

// View the resume for the given id
router.get('/', function(req, res){
    if(req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.getById(req.query.resume_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('resume/resumeViewById', {'result': result});
            }
        });
    }
});

router.get('/add', function(req, res){
    account_dal.getAll(function(err, result){
        if (err) {
            res.send(err);
        }
        else {
            res.render('resume/resumeAdd', {'account': result});
        }
    });
});

router.get('/insert', function(req, res){
    if (req.query.resume_name == null) {
        res.send('Resume Name must be provided.');
    }
    else if (req.query.account_id == null) {
        res.send('An account must be selected');
    }
    else {
        resume_dal.insert(req.query, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                res.redirect(302, '/resume/all');
            }
        });

    }
});

router.get('/delete', function(req, res){
    if (req.query.resume_id == null) {
        res.send('resume_id is null');
    }
    else {
        resume_dal.delete(req.query.resume_id, function(err, result){
            if(err){
                res.send('resume_id is null');
            }
            else {
                res.redirect(302, '/resume/all');
            }
        });
    }
});

module.exports = router;
