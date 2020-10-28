let chai = require('chai');
let chaiHttp = require('chai-http');
const app = require('../index')
let should = chai.should();

chai.use(chaiHttp);

describe('/Post Metric', () => {
    it('it should not POST a metric without a visitor', (done) => {
        let metric = {
            visitor:''
        }
        chai.request(app)
            .post('/Metric/3')
            .send(metric)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done()
            })
    })
    it('it should post the number of visitors', (done) => {
        let metric = {
             visitor: 2,
        }
        chai.request(app)
            .post('/Metric/3')
            .send(metric)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done()
            })
    })
})

describe('/Get Metric sum', () => {
    it('it should get the sum of metric for a key', (done) => {
        chai.request(app)
        .get('/Metric/3/sum')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done()
        })
    } )
})
