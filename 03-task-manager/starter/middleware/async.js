// (fn) represents a function
const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
		next(err);
    }
  };
};

module.exports = asyncWrapper;