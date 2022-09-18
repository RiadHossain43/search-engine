exports.logRequest = async (req, res, next) => {
  console.log(new Date(), "↓");
  console.info(
    "request: ",
    req.method,
    " Host:",
    req.headers.origin,
    " End point:",
    req.originalUrl
  );
  next();
};
