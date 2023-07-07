const { Pool } = require("../database");

const postRegister = async (request, response) => {
  try {
    console.log(request.body);
    let params = [];
    let sql =
      "INSERT INTO user (name, last_name, email, password, is_Tatuador) VALUES (?, ?, ?, ?, ?)";
    params = [
      request.body.name,
      request.body.last_name,
      request.body.email,
      request.body.password,
      request.body.is_Tatuador ? 1 : 0,
    ];
    console.log(params);

 
    const connection = await Pool.getConnection();
    

    let [result] = await connection.query(sql, params);
    console.log(result);


    connection.release();

    if (result.insertId) response.send(String(result.insertId));
    else response.send("-1");
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};

const postLogin  = async (request,response) =>
{
    try 
    {
        
        let respuesta;
        // let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
        let sql = `SELECT * FROM user JOIN photo ON (user.id_user = photo.id_user) WHERE email = ? AND password = ? AND es_publicacion = 0`
        let params = [request.body.email,
                request.body.password];

        let res = await Pool.query (sql, params);
        if (res[0].length > 0){
            respuesta = {
            error:false,
            codigo:200,
            mensaje:"Los datos son correctos",
            data_user: res[0]};
        }else{
            respuesta = {
            error:true,
            codigo:200,
            mensaje:"Los datos son incorrectos",
            data_user: null};
        }
        response.send(respuesta)
      }
        catch (err)
        {
            console.log(err)
        }
      }


      const getUserTatuadorInfo = async (request, response) => {
        console.log("hahaha");
        try {
          let params = [request.params.id_user];
          let respuesta;
          let sql = "SELECT * FROM photo WHERE id_user = ? AND es_publicacion = 1";
      
          console.log(sql, params);
      
          let [result] = await Pool.query(sql, params);
          console.log(result);
      
          respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'funciona',
            data_foto: result
          };

          response.send(respuesta)

        } catch (err) {
          console.log(err);
        }

       
      };

module.exports = { postRegister, postLogin, getUserTatuadorInfo };