const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

module.exports = describe('Login User', () => {
    it('should return error if user does not exists', async () => {
        const response = await chai.request(app)
            .post('/api/v1/login')
            .send({
                email: 'doe@example.com',
                password: 'Secretpassword@123'
            });

        expect(response).to.have.status(401);
        expect(response.body.message).to.equal('user not found');
    });

    it('should return error if password is incorred', async () => {
        const response = await chai.request(app)
            .post('/api/v1/login')
            .send({
                email: 'example@gmail.com',
                password: "xamplee@12"
            });
       console.log(response.body);
        expect(response).to.have.status(401);
        expect(response.body.Message).to.equal('incorrect password or email');
    });

    it('should log in an existing user', async () => {
        const response = await chai.request(app)
            .post('/api/v1/login')
            .send({
                email: 'kus1@gmail.com',
                password: 'Kurrs@234'
            });

        expect(response).to.have.status(200);
        expect(response.body).to.have.property('token');
        expect(response).to.have.cookie('t');
        const redirectResponse = await chai.request(app)
        .get('/logout.html');
        expect(redirectResponse).to.have.status(200);
    });
  
})
