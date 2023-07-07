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
      const obtenerIdUsuario = async (req, res) => {
        try {
          const email = req.params.email;
          const sql = 'SELECT id_user FROM user WHERE email = ?';
          const [result] = await Pool.query(sql, [email]);
          if (result.length > 0) {
            const idUsuario = result[0].id_user;
            res.status(200).json(idUsuario);
          } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Error al obtener el ID del usuario' });
        }
      };
     
      
      
      
      
      
      
      

module.exports = { postRegister, postLogin, obtenerIdUsuario };