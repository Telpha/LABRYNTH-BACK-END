var jwt= require('jsonwebtoken');


const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
      },
     'somethingsecret',
      {
        expiresIn: '30d',
      }
    );
  };
  module.exports = generateToken;