const { check } = require("express-validator");

exports.validateBoard = [check("title").not().isEmpty()];
exports.validateList = [check("list.title").not().isEmpty()];
exports.validateComment = [check("comment.text").not().isEmpty()];
