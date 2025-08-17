import jwt from "jsonwebtoken";

export const getToken = async (user) => {
  const token = jwt.sign(
    { identifier: user._id },
    "ThisKeyIsSupposeToBeSecret"
  );
  return token;
};
