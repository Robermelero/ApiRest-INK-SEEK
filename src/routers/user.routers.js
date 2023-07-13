const {Router} = require ("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/registro", userCtrl.postRegister);
router.post("/login",userCtrl.postLogin);
router.put("/edit-profile-tatuador", userCtrl.editProfile);
router.get("/descubrir-artista", userCtrl.getTatuadoresExplora)
router.get('/profile-tatuador-propia/:id_user', userCtrl.getUserTatuadorInfo);
router.delete('/profile-tatuador-propia', userCtrl.deletePublicacion);



router.post('/estrellas', userCtrl.postOpinion);
router.get('/opiniones/:receptor', userCtrl.getOpiniones);


router.delete('/estrellas/:id_opiniones', userCtrl.borrarOpinion);
router.get('/profile-tatuador-externa/:id_user', userCtrl.getUserTatuadorInfo)
router.get("/explorar", userCtrl.getTatuador);
router.get('/user/:email', userCtrl.obtenerIdUsuario);


module.exports = router;