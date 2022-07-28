const message = require(`../message`);
const bcrypt = require(`bcrypt`);
const userModel = require(`../model/userModel`);
const jwt = require(`jsonwebtoken`);
const dotenv = require(`dotenv`);
dotenv.config();

// Add User

exports.addUser = (req, res) => {
  try {
    userModel.findOne(
      {
        $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
      },
      function (error, result) {
        if (result) {
          res.json({
            Message: message.userAlreadyExist,
            status: 200,
          });
        } else {
          var newUser = new userModel({
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 12),
          });

          newUser.save(function (error, result) {
            if (error) {
              res.json({
                Message: message.somethingWentWrong,
                status: 500,
              });
            } else {
              res.json({
                Message: message.userCreated,
                status: 200,
              });
            }
          });
        }
      }
    );
  } catch (error) {}
};

// Login

exports.login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        Message: message.userNotExist,
        code: 401,
      });
    }

    const passwordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatched) {
      res.json({
        Message: message.enterCorrectPassword,
        code: 401,
      });
    }

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const tokenPayload = {
      roleID: user.roleID,
    };

    const token = jwt.sign(tokenPayload, jwtSecretKey, { expiresIn: `5m` });

    const data = {
      email: user.email,
      token: token,
    };

    res.json({
      Message: message.loginSuccessfull,
      code: 200,
      data: data,
    });
  } catch (err) {}
};

// User Details

exports.userDetails = (req, res) => {
  userModel.findOne({ _id: req.body._id }, function (error, result) {
    switch (error) {
      case error != null:
        res.json({
          Message: message.somethingWentWrong,
          status: 500,
        });
        break;

      default:
        res.json({
          Message: message.userDetails,
          status: 200,
          data: result,
        });
        break;
    }
  });
};

// Get All User List

exports.allUserList = (req, res) => {
  userModel.find(function (error, result) {
    switch (error) {
      case error != null:
        res.json({
          Message: message.somethingWentWrong,
          status: 500,
        });
        break;

      default:
        res.json({
          Message: message.allUserList,
          status: 200,
          data: result,
        });
        break;
    }
  });
};

// Remove User

exports.deleteUser = (req, res) => {
  userModel.findOneAndDelete({ _id: req.body._id }, function (error, result) {
    switch (error) {
      case error != null:
        res.json({
          Message: message.somethingWentWrong,
          status: 500,
        });
        break;

      default:
        res.json({
          Message: message.userDeleted,
          status: 200,
        });
        break;
    }
  });
};

//Remove All User

exports.deleteAllUser = (req, res) => {
  userModel.remove(function (error, result) {
    switch (error) {
      case error != null:
        res.json({
          Message: message.somethingWentWrong,
          status: 500,
        });
        break;

      default:
        res.json({
          Message: message.allUserDelete,
          status: 200,
        });
        break;
    }
  });
};

// Update User

exports.updateUser = (req, res) => {
  userModel.findByIdAndUpdate(
    { _id: req.body._id },
    { country: req.body.country, phoneNumber: req.body.phoneNumber },
    function (error, result) {
      switch (error) {
        case error != null:
          res.json({
            Message: message.somethingWentWrong,
            status: 500,
          });
          break;

        default:
          res.json({
            Message: message.userUpdate,
            status: 200,
          });
          break;
      }
    }
  );
};

// Update Many User

exports.updateAllUser = (req, res) => {
  userModel.updateMany(
    { country: req.body.country },
    { $set: { phoneNumber: req.body.phoneNumber } },
    function (error, result) {
      switch (error) {
        case error != null:
          res.json({
            Message: message.somethingWentWrong,
            status: 500,
          });
          break;

        default:
          res.json({
            Message: message.allUserUpdate,
            status: 200,
          });
          break;
      }
    }
  );
};
