const {Router} = require ("express");
const router = Router();

const followCtrl = require("../controller/follow.controller");

router.post('/user/:id_user/follow/', followCtrl.postFollow);
router.post('/user/:id_user/unfollow', followCtrl.postUnfollow);




module.exports = router;