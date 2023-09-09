const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

module.exports = describe('User Signup', () => {
    
    it('should return an error if user already exists', async () => {
        const response = await chai.request(app)
            .post('/api/v1/signup')
            .send({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: 'StrongPassword@123'
            });

        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('user already exists');
    });

    it('should return an error if user name is small', async () => {
        const response = await chai.request(app)
            .post('/api/v1/signup')
            .send({
                name: 'J',
                email: 'j.doe@example.com',
                password: 'StrongPassword@123'
            });
        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('name should be more than 5 characters');
    });


    it('should return an error if email is invalid', async () => {
        const response = await chai.request(app)
            .post('/api/v1/signup')
            .send({
                name: 'Jooee',
                email: 'jooeeexample.com',
                password: 'StrongPassword@123'
            });

        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('enter a valid email address');
    });


    it('should return an error if password is not strong', async () => {
        const response = await chai.request(app)
            .post('/api/v1/signup')
            .send({
                name: 'Jooee',
                email: 'j.doe@example.com',
                password: 'strongPassword123'
            });

        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('enter a strong password');
    });


    it('should create a new user when valid data is provided', async () => {
        const response = await chai.request(app)
            .post('/api/v1/signup')
            .send({
                name: 'Jooeehh',
                email: 'jooeehh.doe@example.com',
                password: 'StrongPassword@123'
            });

        expect(response).to.have.status(200);
        expect(response.text).to.equal('Welcome Jooeehh, thanks for signing up');
    });
});
