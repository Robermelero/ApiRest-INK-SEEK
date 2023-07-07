const { Pool } = require("../database");


const getTatuador = async (request,response) => 
{
    try
    {
     
        let respuesta;
        let sql = "SELECT * FROM user  WHERE nickname = ? OR style = ? OR studio =? ";
        let params = [request.query.nickname,
                      request.query.style,
                      request.query.studio];
        let res = await Pool.query(sql,params);
        
        if (res[0].length > 0){
            respuesta = {
            error:false,
            codigo:200,
            mensaje:"Tatuadores encontrados",
            data: res[0]};
        }else{
            respuesta = {
            error:true,
            codigo:200,
            mensaje:"no hay tatuadores",
            data: null};
        }
        response.send(respuesta)
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports = {getTatuador}