const { Pool } = require("../database");

const homeGetPhotos = async (req, res) => {
    try {
        const id_follower= req.params.id_follower
        const id_user= req.params.id_user
      const fotos = await Pool.query(`
      SELECT p.*, u.name as user_name FROM photo p 
      INNER JOIN follow f ON p.id_user = f.id_user 
      INNER JOIN user u ON p.id_user=u.id_user
      WHERE f.id_follower = ? AND f.id_user = ? AND (p.es_publicacion = 1 OR p.es_publicacion = 0)
      `,[id_follower,id_user]);

  
      const respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'fotos obtenidas',
        fotos: fotos,
        
      };

      res.send(respuesta);
    } catch (error) {
      const respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Error al obtener fotos',
        error: error.message,
      };
      console.log(error);
      res.send(respuesta);
    }
  };


  const homeSearch = async (req, res) => {
    try {
        const search = req.query.q;
        const id_user1 = req.params.id_user1;


        const fotos = await Pool.query(`
        SELECT p.*
        FROM photo p
        INNER JOIN user u ON p.id_user = u.id_user
        INNER JOIN follow f ON u.id_user = f.id_user
        WHERE (u.alias LIKE ? OR u.name LIKE ?) AND f.id_follower = ? AND p.es_publicacion = 1
        `, [`%${search}%`, `%${search}%`, id_user1]);
      const respuesta = {
        error: false,
        codigo: 200,
  
        mensaje: 'toma tus fotos',
        eventos: fotos,
      };
      res.send(respuesta);
    } catch (error) {
      const respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Error al buscar fotos',
        error: error.message,
      };
      console.log(error);
      res.send(respuesta);
    }
  };

  module.exports={homeGetPhotos,homeSearch}