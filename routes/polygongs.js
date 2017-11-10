'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const uuidv4 = require('uuid/v4');

router.get('/polygongs/:url', (req, res, next) => {
  knex('polygongs')
    .where('polygong_url', req.params.url)
    .first()
    .then((state) => {
      res.send(state)
    })
    .catch((err) => next(err));
});

router.post('/polygongs', (req, res, next) => {
  console.log(req.body);
  knex('polygongs')
    .insert({'polygong_data': JSON.stringify(req.body.directives), 'polygong_url': uuidv4()}, "*")
    .then((url) => {
      console.log(url[0].polygong_url);
      res.send(url[0].polygong_url)
    })
    .catch((err) => next(err));
})

module.exports = router;
