const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.get('/profile-tatuador-propia/:id_user', userCtrl.getUserTatuadorInfo);
router.delete('/profile-tatuador-propia', userCtrl.deletePublicacion);
router.post('/estrellas', userCtrl.postOpinion);
router.get('/opiniones/:receptor', userCtrl.getOpiniones);
router.delete('/estrellas', userCtrl.borrarOpinion);




module.exports = router;