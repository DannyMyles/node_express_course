class ApiResponse {
  constructor(
    status = [200,500],
    data = null,
    message = "Something went wrong please try again later",
    error = true
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static generateDefaultErrorResponse() {
    return new ApiResponse();
  }

  static generateNotFoundErrorResponse(resource) {
    return new ApiResponse(404, null, `${resource} is not found`);
  }

  static generateBadRequestErrorResponse() {
    return new ApiResponse(400, null, "Invalid data is provided");
  }

  static generateNotAuthorizedErrorResponse() {
    return new ApiResponse(401, null, "Not authorized!");
  }

  static generateDuplicationErrorResponse() {
    return new ApiResponse(409, null, "Duplication detected");
  }

  static generateBearerInvalidErrorResponse() {
    return new ApiResponse(401, null, "Bearer is invalid");
  }

  static generateLoginInvalidErrorResponse() {
    return new ApiResponse(401, null, "INVALID_PASSWORD_OR_USERNAME");
  }

  static generatePermissionDeniedErrorResponse() {
    return new ApiResponse(
      403,
      null,
      "You don't have permission to access this resource"
    );
  }
}

module.exports = ApiResponse;
