const dotenv = require(`dotenv`);
dotenv.config();

module.exports = {
  portMessage: `Port Is Running On ${process.env.Port}`,
  codeWorking: `Code Is Working`,
  dataBase: `DB Is Connected`,
  somethingWentWrong: `Something Went Wrong`,
  userCreated: `User Created Successfully`,
  userDetails: `User Details Recieve Successfully`,
  allUserList: `All User List Recieved Successfully`,
  userDeleted: `User Deleted Successfully`,
  allUserDelete: `All Users Deleted Successfully`,
  userUpdate: `User Updated Successfully`,
  allUserUpdate: `Users Updated Successfully`,
  userAlreadyExist: `Email Or Number Is Already In The Database`,
  userNotExist: `User Is Not Exist`,
  enterCorrectPassword: `Please Enter Correct Password`,
  loginSuccessfull: `Login Successfull`,
  tokenNotAvailble: `Token Not Available`,
  tokenInvaild: `Token Invalid`,
};
