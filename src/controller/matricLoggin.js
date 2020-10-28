const responseHandler = require('../utils/responseHandler')
const repo = require('../database/data');

class MetricController {
    static async Loggin(req, res) {
        const { key } = req.params
        const { visitor } = req.body;
        const numberOfVisitors = parseInt(visitor, 10)
        if (!numberOfVisitors) {
             return responseHandler(res, {
                statusCode: 400, message: `visitor is not an integer` })
            }
            await repo.create({
            'Key': key,
            'Visitor': visitor,
            'TimeOfArrival': new Date().getHours()
        })
            return responseHandler(res, {
                statusCode: 200, message: `numbers of visitors has been logged in for key ${key}` })
    }

    static async GetMetric(req, res) {
        const { key } = req.params;
        const all = await repo.getAll()
        const results = await repo.findByKey(key)
        // filter out and delete time of visitor greater than 2hrs
        const datass = results.filter(result => parseInt(new Date().getHours(), 10) - parseInt(result.TimeOfArrival, 10) > 2)
        datass.forEach(data => repo.deleteByKey(data.TimeOfArrival))

        //filter out time of visitor lesser than 2
        const datas = results.filter(result => parseInt(new Date().getHours(), 10) - parseInt(result.TimeOfArrival, 10) <= 2)
    
        // sum up the number of visitors in recent hours for a particular key
        const sum = datas.map(data => data.Visitor).reduce((acc, one) => acc + parseInt(one, 10), 0)
            return responseHandler(res, {
            statusCode: 200, message: `numbers of visitors has been logged in for key ${key}`, value: sum })
    }
}
        
module.exports = MetricController

