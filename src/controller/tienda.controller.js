const {Pool} = require("../database")


const getProducto = async (req, res)=>{
    try{
        let params =[]
        let sql = "SELECT name, photo, photo.id_photo, producto.id_producto FROM producto JOIN photo ON(producto.id_photo = photo.id_photo) WHERE photo.id_user = ?";
         params =[
            req.params.id_user,
        ]
        
        console.log(sql);
        let [result] = await Pool.query(sql,params);
        console.log(result);

        if(result.length > 0){
            respuesta ={
                error: false, codigo: 200, mensaje : 'todos los datos enviados satisfactoriamente', data_prenda : result};
            res.send(respuesta)
        }
    }
    catch(err){
        console.log(err)
    }
}


const postProducto = async (req, res)=>{
    try{
    
        let sql2 = "INSERT INTO photo (photo, id_user) VALUES ('"+req.body.photo+"', '"+req.body.id_user+"')"
        
        console.log(sql2)
        let [result] = await Pool.query(sql2);
        console.log(result);
        let sql3 ="INSERT INTO producto (name,id_user, id_photo) VALUES ('"+req.body.name+"','"+req.body.id_user+"',"+result.insertId+")";
        [result] = await Pool.query(sql3)
        console.log(result)
        

        if(result.length > 0){
            respuesta = {error : false, codigo: 200,
            mensaje: 'Producto creado satisfactoriamente', data_prenda: result}
            res.send(respuesta)
        }
    }
    catch(err){
        console.log(err)
    }
}


const deleteProducto = async(req, res)=>{
    try{
        let respuesta;
        let sql = "DELETE FROM photo WHERE id_photo = '"+req.body.id_photo+"' "

        console.log(sql)
        let [result] = await Pool.query(sql)
        console.log(result)

        respuesta = {error : false, codigo : 200, mensaje: 'producto borrado satisfactoriamente', data_prenda : result}
        res.send(respuesta)
        // if(result.length > 0){
        //     respuesta = {error : false, codigo : 200, mensaje: 'producto borrado satisfactoriamente', data_prenda : result}
        //     res.send(respuesta)
        // }
    }
    catch(err){
        console.log(err)
    }
}



module.exports = {getProducto,postProducto, deleteProducto}