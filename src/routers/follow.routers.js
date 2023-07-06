const {Router} = require ("express");
const router = Router();

const followCtrl = require("../controller/follow.controller");

router.post('/follow', followCtrl.postFollow);
router.post('/unfollow', followCtrl.postUnfollow);


module.exports = router;