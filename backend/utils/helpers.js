// const jwt = require("jsonwebtoken");

// exports = {};
// exports.getToken = async (user) => {
//   const token = jwt.sign(
//     { identifier: user._id },
//     "ThisKeyIsSupposeToBeSecret"
//   );
//   return token;
// };
// module.exports = exports;

const jwt = require("jsonwebtoken");

exports = {};
exports.getToken = async (user) => {
  const token = jwt.sign(
    { identifier: user._id },
    "ThisKeyIsSupposeToBeSecret"
  );
  return token;
};
module.exports = exports;
