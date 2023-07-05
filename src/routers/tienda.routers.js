const {Router} = require ("express");
const router = Router();
const tiendaCtrl = require ("../controller/tienda.controller");



router.get("/tienda/:id_user", tiendaCtrl.getProducto)

router.post("/tienda", tiendaCtrl.postProducto)

router.delete("/tienda", tiendaCtrl.deleteProducto)

module.exports = router