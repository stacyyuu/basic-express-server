const { sequelize, User } = require('../auth/models');
const base64 = require('js-base64');
const bcrypt = require('bcrypt');
const { signIn } = require('../auth/routes');

describe('Auth Routes', () => {
  beforeEach(() => sequelize.sync());

  test('Can create user', async () => {
    const user = await User.createWithHashed('stacy', 'maru5');
    expect(user.username).toEqual('stacy');
    expect(bcrypt.compareSync('maru5', user.username));
  });

  test('Can find user with log in', async () => {
    const user = await User.findLoggedIn('stacy', 'maru5');
    expect(user).toBeDefined();
  });
  
  test('Nulls for invalid password', async () => {
    await User.createWithHashed('stacy', 'maru5');
    const user = await User.findLoggedIn('stacy', 'badpass');
    expect(user).toEqual(null);
  });

  test('Nulls for missing user', async () => {
    await User.createWithHashed('stacy', 'maru5');
    const user = await User.findLoggedIn('someone', 'maru5');
    expect(user).toEqual(null);
  });

  test('Returns JWT from after sign in', async () => {
    // arrange
    // await User.createWithHashed('Stacy', 'maru12');

    // act
    const req = {
      header: jest.fn().mockImplementation((header) => {
        if (header === 'Authorization') {
          return 'Basic ' + base64.encode('stacy:maru5');
        }
        return 'Header does not contain Authorization';
      }),
    };

    const res = { send: jest.fn() };
    const next = jest.fn();
    await signIn(req, res, next);

    // assert
    // mock.lastCall - returns arguments that was passed to the send jest mock function
    const jwtoken = res.send.mock.lastCall[0];
    console.log(jwtoken);
    const [_header, payloadBase64, _signature] = jwtoken.split('.');
    const payload = JSON.parse(base64.decode(payloadBase64));
    expect(payload.username).toBe('stacy');
  });
});
