const {Router} = require ("express");
const router = Router();
const homeController = require("../controller/home.Controller");

router.get(`/home/photos/:id_follower`, homeController.homeGetPhotos)
router.get(`/home/search/:id_user1`,homeController.homeSearch)
router.get(`/home/followed_users/:id_user`,homeController.getFollowedUsers)


module.exports=router

