'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();

router.get('/maps/:id', (req, res, next) => {
  knex('maps')
    .where('id', req.params.id)
    .first()
    .then((map) => {
      res.send(map)
    })
    .catch((err) => next(err));
});

router.get('/maps', (req, res, next) => {
  knex('maps')
    .then((maps) => {
      res.send(maps)
    })
    .catch((err) => next(err));
})

module.exports = router;
