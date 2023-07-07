const { Pool } = require("../database");

const addCita = async (request, response) => {
    try {
      const { id_user, email, date, hora, asunto } = request.body;
  
      const sql = "INSERT INTO cita (id_user, email, fecha, hora, asunto) VALUES (?, ?, ?, ?, ?)";
      const params = [id_user, email, date, hora, asunto];
  
      const [result] = await Pool.query(sql, params);
  
      let respuesta;
  
      if (result.affectedRows > 0) {
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: "Cita agregada exitosamente",
          data: result
        };
      } else {
        respuesta = {
          error: true,
          codigo: 200,
          mensaje: "No se pudo agregar la cita",
          data: null
        };
      }
  
      response.send(respuesta);
    } catch (error) {
      console.log(error);
      response.status(500).send("Error al agregar la cita");
    }
  };
  
  
  const getCitas = async () => {
    try {
      const query = 'SELECT * FROM cita';
      const result = await Pool.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  };

module.exports = { addCita, getCitas };