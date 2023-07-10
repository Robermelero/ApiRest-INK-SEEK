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
        let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
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


      const getTatuadoresExplora = async (request, response) => {
  try {
    let respuesta;
    let sql = "SELECT * FROM user WHERE is_Tatuador = 1";
    // let params = [request.params.is_Tatuador]
    let res = await Pool.query(sql);

    if (res[0].length > 0){
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Artistas disponibles",
        data_artistas: res[0]};
    }else{
      respuesta = {
        error: false,
        codigo: 200,
        mensaje: "Artistas disponibles",
        data_artistas: null};
    }
    response.send(respuesta)
    console.log(res[0])
  }
  catch(err){
    console.log(err)
  }
      }

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
          console.log(res[0])
      }
      catch(err)
      {
          console.log(err);
      }
  }
  

module.exports = { postRegister, postLogin, getTatuadoresExplora, getTatuador};