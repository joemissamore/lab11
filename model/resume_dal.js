/**
 * Created by Joe on 11/16/16.
 */
var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM resume_view;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(resume_id, callback) {
    var query = 'SELECT * FROM resume WHERE resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO resume (resume_name, account_id) VALUES (?, ?)';
    var queryData = [params.resume_name, params.account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
}

exports.delete = function(resume_id, callback) {
    var query = 'DELETE FROM resume where resume_id = ?';
    var queryData = [resume_id];

    connection.query(query, queryData, function(err, result){
        callback(err, result);
    });
}
