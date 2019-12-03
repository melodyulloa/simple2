const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync("./authkey.p8");
const token = jwt.sign({}, privateKey, {
  algorithm: "ES256",
  expiresIn: "2 days",
  audience: "https://appleid.apple.com",
  issuer: "9WHUVRK6QE",
  subject: "me.jdiego.simplepos",
});

console.log("The token is:", token);

export default token;