const {connection} = require("../database")


const getProducto = async (req, res)=>{
    try{
        let params =[]
        let sql = "SELECT name, photo, id_photo, id_producto FROM producto JOIN photo ON(producto.id_photo = photo.id_photo) WHERE producto.id_user = ?";
         params =[
            req.params.id_user,
            // req.params.id_producto
        ]
        
        console.log(sql);
        let [result] = await connection.query(sql,params)
        console.log(result);

        if(result.length > 0){
            respuesta ={
                error: false, codigo: 200, mensaje : 'todos los datos enviados satisfactoriamente', data : result}
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
        let [result] = await connection.query(sql2);
        console.log(result);
        let sql3 ="INSERT INTO producto (name,id_user, id_photo) VALUES ('"+req.body.name+"','"+req.body.id_user+"',"+result.insertId+")";
        [result] = await connection.query(sql3)
        console.log(result)
        

        if(result.length > 0){
            respuesta = {error : false, codigo: 200,
            mensaje: 'Producto creado satisfactoriamente', data: result}
            res.send(respuesta)
        }
    }
    catch(err){
        console.log(err)
    }
}


const deleteProducto = async(req, res)=>{
    try{
        let sql = "DELETE FROM photo WHERE id_photo = '"+req.body.id_photo+"' "

        console.log(sql)
        let [result] = await connection.query(sql)
        console.log(result)

        if(result.length > 0){
            respuesta = {error : false, codigo : 200, mensaje: 'producto borrado satisfactoriamente', data : result}
            res.send(respuesta)
        }
    }
    catch(err){
        console.log(err)
    }
}



module.exports = {getProducto,postProducto, deleteProducto}