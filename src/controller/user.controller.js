const { request, response } = require("express");
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

      const deletePublicacion = async (request, response) => {
        try{
          let respuesta;
          let sql = "DELETE FROM photo WHERE id_photo = '"+ request.body.id_photo +"'"
          console.log(sql);

          let [result] = await Pool.query(sql);
          console.log(result);

          respuesta = {
            error: false,
            codigo: 200,
            mensaje: "publicacion borrada",
            data_foto: result
          };

          response.send(respuesta)

        }
        catch (err){
          console.log(err);
        }
      }

const postOpinion = async (request, response) => {
  try {
   
    let params = [];
    let respuesta;
    let sql2 = `INSERT INTO opiniones (emisor, receptor, comentario, puntuacion) VALUES (?,?,?,?)`;
    console.log(sql2);
    params = [
      request.body.emisor,
      request.body.receptor,
      request.body.comentario,
      request.body.puntuacion,
    ]
    
    let [result] = await Pool.query(sql2, params);
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: "opinion enviada",
      data_opinion: result
    };

    console.log("hola :" + result);

    response.send(respuesta)
    console.log('esta es la respuesta: '+respuesta);

  } catch (error) {
    console.error(error);
    response.send(error);
  }

};

//esto lo hago para mostrar las opiniones en la vista tatuador

const getOpiniones = async (request, response) => {
  try {
    let respuesta;
    let params = []
    // let sql = "SELECT * FROM opiniones WHERE receptor = '"+ request.body.receptor +"'";
    // let sql = "SELECT * FROM opiniones";
    let sql = "SELECT * FROM opiniones WHERE receptor = ?"
console.log(sql);
    params = [request.params.receptor]
    let [result] = await Pool.query(sql, params);
    console.log(result);
    respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Opiniones obtenidas',
      data_opinion: result
    };
console.log(respuesta);
    response.send(respuesta);
    
  } catch (error) {
    console.error(error);
    response.send(error);
  }
};

//para borrar opinion que escribe el usuario

const borrarOpinion = async (request, response) => {
  try{
    console.log(request.body);
    console.log("consoleloooooooooooooog");
    let respuesta;
    let sql = "DELETE FROM opiniones WHERE id_opiniones = '"+ request.body.id_opiniones +"'"
    console.log(sql);

    let [result] = await Pool.query(sql);
    console.log(result);

    respuesta = {
      error: false,
      codigo: 200,
      mensaje: "opinion borrada",
      data_foto: result
    };

    response.send(respuesta)

  }
  catch (err){
    console.log(err);
  }
}





module.exports = { postRegister, postLogin, getUserTatuadorInfo, deletePublicacion, postOpinion, getOpiniones, borrarOpinion };