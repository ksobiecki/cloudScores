const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
      console.log('verofying');
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, "dlugi_ciag_znakow_tu_musi_byc");
      console.log('verified');
      next();
    } catch (error) {
      res.status(406).json({ message: "Auth failed!" });
    }
};
