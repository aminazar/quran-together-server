/**
 * Created by Ali on 5/14/2017.
 */
let badPass = new Error("Incorrect password");
badPass.number = 401;

let noUser = new Error("User not found");
noUser.number = 400;

let adminOnly = new Error("Admin only functionality");
adminOnly.number = 403;

let emailNotFound = new Error("The email not found");
emailNotFound.number = 404;

let emailIsIncorrect = new Error("The email is incorrect");
emailIsIncorrect.number = 406;

module.exports = {
  badPass: badPass,
  noUser: noUser,
  adminOnly: adminOnly,
  emailNotFound: emailNotFound,
  emailIsIncorrect: emailIsIncorrect,
};