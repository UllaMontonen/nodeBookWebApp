const chai = require('chai');
const chaihttp = require('chai-http');
const app = require('../index');
const query = require('../db/books');
const should = chai.should();

chai.use(chaihttp);

const testUser = {
    email: process.env.TEST_EMAIL,
    password: process.env.TEST_PASSWORD
};

const testBook = {
    name: 'Murder on the Orient Express',
    author: 'Agatha Christie',
    year: 1934
}

let token;

describe('/POST login', () => {
    it('should log in a user and return a token', (done) => {
        chai.request(app)
            .post('/login')
            .send(testUser)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                token = res.body.token;
                done();
            });
    });
});


describe('/POST books', () => {
    beforeEach((done) => {
        query.deleteAllBooks();
        done();
    });
    it('Add new book', (done) => {
        chai.request(app)
            .post('/api/books')
            .set('Content-Type', 'application/json')
            .set('Authorization', `${token}`)
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
            .set('Authorization', `${token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    });
});