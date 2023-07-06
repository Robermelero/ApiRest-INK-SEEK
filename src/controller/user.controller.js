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

  /////EDITAR PERFIL////
  const editProfile = async (request, response) => {
    try {
      let sql = "UPDATE user SET name = ?, last_name = ?, email = ?, password = ?, nickname = ?, style = ?, studio = ?, descripcion = ?  WHERE id_user = ?";
      let params = [request.body.name, request.body.last_name, request.body.email, request.body.password, request.body.nickname, request.body.style, request.body.studio, request.body.descripcion, request.body.id_user];
      let res = await Pool.query(sql, params);
      console.log(res)
      response.json({
        error: false,
        message: "Perfil actualizado correctamente"
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        error: true,
        message: "Ocurrió un error al actualizar el perfil"
      })
    }
  }
  
  // const editProfileTatuador = async (request, response) => {
  //   try {
  //     let sql = "UPDATE user SET name = ?, last_name = ?, email = ?, id_photo = ?, password = ?, nickname = ?, style = ?, studio = ?, descripcion = ? WHERE id_user = ?";
  //     let params = [request.body.name, request.body.last_name, request.body.email, request.body.id_photo, request.body.id_user, request.body.password, request.body.nickname, request.body.style, request.body.studio, request.body.descripcion];
  //     let res = await Pool.query (sql, params);
  //     if (res[0].length > 0){
  //         respuesta = {
  //         error:false,
  //         codigo:200,
  //         mensaje:"Los datos son correctos",
  //         data_user: res[0]};
  //     }else{
  //         respuesta = {
  //         error:true,
  //         codigo:200,
  //         mensaje:"Los datos son incorrectos",
  //         data_user: null};
  //     }
  //     response.send(respuesta)
  //   }
  //   catch (err)
  //   {
  //         console.log(err)
  //   }
  // }
  

module.exports = { postRegister, postLogin, editProfile };