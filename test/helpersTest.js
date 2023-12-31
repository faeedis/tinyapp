const { assert, user } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function () {
  it('should return a user with valid email', function () {
    const user = getUserByEmail("user@example.com", testUsers);
    const expectedUserID = "userRandomID";

  });
  it('getUserByEmail should return a user object when its provided with an email that exists in the database', function () {
    const user = getUserByEmail("user@example.com", testUsers);
    const expectedUserID = "userRandomID";
    assert.equal(user.id, expectedUserID);

  });
  it('should test that a non-existent email returns undefined', function () {
    const user = getUserByEmail("user41@example.com", testUsers)
    assert.equal(user, undefined);

  });




});