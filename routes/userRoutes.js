const router = require(`express`).Router();
const userController = require(`../controllers/userController`);
const { validateToken } = require(`../middleware/jwtValidation`);
const { validateUserModel, loginValidation, validation } = require(`../middleware/modelValidation`);

router.post(`/addUser`, validateUserModel, validation, userController.addUser);
router.post(`/login`, userController.login);
router.post(`/userDetails`, validateToken, userController.userDetails);
router.post(`/allUser`, validateToken, userController.allUserList);
router.post(`/deleteUser`, validateToken, userController.deleteUser);
router.post(`/deleteAllUser`, validateToken, userController.deleteAllUser);
router.post(`/updateUser`, validateToken, userController.updateUser);
router.post(`/updateAllUser`, validateToken, userController.updateAllUser);

module.exports = router;
