const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
const query = require('../db/books');
const should = chai.should();

chai.use(chaihttp);

const testBook = {
    name: 'Murder on the Orient Express',
    author: 'Agatha Christie',
    year: '1934'
}

describe('/POST books', () => {
    beforeEach((done) => {
        query.deleteAllBooks();
        done();
    });
    it('Add new book', (done) => {
        chai.request(app)
            .post('/api/books')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(testBook))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            });
    });
});

describe('/GET books', () => {
    it('Fetch all books', (done) => {
        chai.request(app)
            .get('/api/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            })
    });
});