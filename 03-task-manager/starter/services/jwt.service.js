const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class JwtService {
  generateAccessToken(id,username,email) {
    return jwt.sign(
      {
        id: id,
        username: username,
        email: email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '3d',
      },
    );
  }
  verifyToken(token, next){
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return next(err);
    }
  }
}
module.exports = JwtService;
