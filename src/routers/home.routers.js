const {Router} = require ("express");
const router = Router();
const homeController = require("../controller/home.Controller");

router.get(`/user/:id_follower/following/:id_user/photos`, homeController.homeGetPhotos)
router.get(`/user/:id_user1/search`,homeController.homeSearch)

module.exports=router