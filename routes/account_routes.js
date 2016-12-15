/**
 * Created by Joe on 11/16/16.
 */
var express = require('express');
var router = express.Router();
var account_dal = require('../model/account_dal');


// View All accounts
// WHATS UP WITH /all
router.get('/all', function(req, res) {
    account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('account/accountViewAll', { 'result':result });
        }
    });

});

// View the school for the given id
router.get('/', function(req, res){
    if(req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.getById(req.query.account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('account/accountViewById', {'result': result});
            }
        });
    }
});

router.get('/insert', function(req, res){
  if (req.query.first_name == null) {
      res.send ('First Name must be provided.');
  }
  else if (req.query.last_name == null) {
      res.send ('Last Name must be provided.');
  }
  else if (req.query.email == null) {
      res.send('Email must be provided.');
  }
  else {
      account_dal.insert(req.query, function(err, result){
          if(err) {
              res.send(err);
          }
          else {
              res.redirect(302, '/account/all');
          }
      });
  }
});

router.get('/delete', function(req, res){
    if (req.query.account_id == null) {
        res.send('account_id is null');
    }
    else {
        account_dal.delete(req.query.account_id, function(err, result){
            if (err){
                res.send('account_id is null');
            }
            else {
                res.redirect(302, '/account/all');
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
            res.render('account/accountAdd', {'account': result});
        }
    });
});

module.exports = router;
