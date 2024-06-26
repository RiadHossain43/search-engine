exports.cors = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,x-auth-token,x-register-token,x-resetpassword-token"
  );
  next();
};
