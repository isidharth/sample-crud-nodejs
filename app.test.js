const request = require('supertest');

let app = null,
    db = null,
    api = null,
    user = {},
    data = {
      email:"sid@demo.com",
      password:"qwerty_asdf",
      name:"Sid"
    }

beforeAll(async (done)=>{
  app = await require('./app')
  done()
})

test('Signup',async (done) => {
  jest.setTimeout(50000)
    const response = await request(app)
        .post('/signup')
        .send(data);
    expect(response.statusCode).toBe(200);
    done()
})

test('Login',async (done) => {
  jest.setTimeout(50000)
    const response = await request(app)
        .post('/login')
        .send(data);
    user.token = response.body.token
    expect(response.statusCode).toBe(200);
    done()
})

test('Get All Users',async (done) => {
  jest.setTimeout(50000)
    const response = await request(app)
        .get('/users')
    expect(response.statusCode).toBe(200);
    done()
})

test('Get User with Email',async (done) => {
  jest.setTimeout(50000)
    const response = await request(app)
        .get('/user?email=sid@demo.com')
    expect(response.statusCode).toBe(200);
    done()
})

test('Update User',async (done) => {
  jest.setTimeout(50000)
    const response = await request(app)
        .post('/update')
        .send({token:user.token,email:"sid@demo2.com"})
    expect(response.statusCode).toBe(200);
    done()
})

afterAll(async (done) => {
  jest.setTimeout(50000)
  let Db = require('./db')()
  db = new Db();
  await db.getConnection();
  await db.collection.users.deleteOne({email:data.email})
  done()
});
