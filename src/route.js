const express = require('express');
const MetricController = require('./controller/matricLoggin');
const router = express.Router()
const validateMetric = require('./utils/validation');

router.route('/Metric/:key')
    .post(validateMetric, MetricController.Loggin)

router.route('/Metric/:key/sum')
    .get(MetricController.GetMetric)

module.exports = router