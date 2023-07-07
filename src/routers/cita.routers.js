const {Router} = require ("express");
const router = Router();
const citaCtrl = require("../controller/cita.controller");

router.post('/add-cita', citaCtrl.addCita);
router.get('/citas', citaCtrl.getCitas);


module.exports = router;