const JwtService = require('../../services/jwt.service');
const { ApiResponse } = require("../models/responseModel")

const jwtService = new JwtService();

async function verifyUser(req, res, next) {
  try {
    const authHeader = req.header('authorization');

    if (!authHeader) {
      return ApiResponse.generateNotAuthorizedErrorResponse();
    }

    const bearer = authHeader.split(' ');
    if (
      bearer[0].toLowerCase() !== 'bearer' ||
      typeof bearer[1] === 'undefined'
    ) {
      return ApiResponse.generateNotAuthorizedErrorResponse();
    }
    const accessToken = bearer[1];

    if (!accessToken) {
      return ApiResponse.generateNotAuthorizedErrorResponse();
    }
    const user = jwtService.verifyToken(accessToken, next);

    if (!user) {
      return ApiResponse.generateNotAuthorizedErrorResponse();
    }
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = verifyUser;
