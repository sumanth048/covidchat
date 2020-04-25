const jwt = require("jsonwebtoken");
const config = require("config");
const logger = require("../config/logger");

module.exports = function(req, res, next) {
  // Get the token from header
  const token = req.header("x-auth-token");
  //console.log("Token == ", token);

  //Check if token is there
  if (!token) {
    return res.status(401).json({
      status: "TOKEN_EXPIRED",
      msg: "No token, authorization denied."
    });
  }

  // Verify token and event id
  try {
    jwt.verify(token, config.get("jwt_secret"), (error, decoded) => {
      if (error) {
        res.status(401).json({
          status: "TOKEN_EXPIRED",
          msg: "Token is not valid or expired"
        });
      } else {
        if (decoded.event_id === event_id) {
          req.f_t_id = decoded.f_t_id;
          next();
        } else {
          res.status(401).json({
            status: "TOKEN_EXPIRED",
            msg: "Token is not valid or expired"
          });
        }
      }
    });
  } catch (ex) {
    console.log(ex);
    console.error("Something wrong with auth middleware");
    logger.log("error", `Something wrong with auth middleware`);
    res.send(
      JSON.stringify({
        status: "FAIL"
      })
    );
  }
};
