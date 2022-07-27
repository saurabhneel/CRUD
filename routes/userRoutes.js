const router = require(`express`).Router();
const userController = require(`../controllers/userController`);
const { validateUserModel, validation } = require(`../middleware/modelValidation`);

router.post(`/addUser`, validateUserModel, validation, userController.addUser);
router.post(`/login`, userController.login);
router.post(`/userDetails`, userController.userDetails);
router.get(`/allUser`, userController.allUserList);
router.post(`/deleteUser`, userController.deleteUser);
router.get(`/deleteAllUser`, userController.deleteAllUser);
router.post(`/updateUser`, userController.updateUser);
router.post(`/updateAllUser`, userController.updateAllUser);

module.exports = router;
