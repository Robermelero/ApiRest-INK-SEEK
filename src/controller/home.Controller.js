const { Pool } = require("../database");

const getFollowedUsers = async (req, res) => {
  const { id_user } = req.params;

  try {
    const followedUsers = await Pool.query(`
      SELECT u.*
      FROM user u
      INNER JOIN follow f ON u.id_user = f.id_user
      WHERE f.id_follower = ?
    `, [id_user]);
    console.log("ID_USER= ID_",id_user,);

    const respuesta = {
      error: false,
      codigo: 200,
      mensaje: 'Usuarios seguidos obtenidos',
      followedUsers: followedUsers,
    };

    res.send(respuesta);
  } catch (error) {
    const respuesta = {
      error: true,
      codigo: 200,
      mensaje: 'Error al obtener usuarios seguidos',
      error: error.message,
    };
    console.log(error);
    res.send(respuesta);
  }
};

const homeGetPhotos = async (req, res) => {
    try {
        const id_follower= req.params.id_follower
      console.log("entrando");
      const fotos = await Pool.query(`
      SELECT p.*, u.nickname AS user_name, u.id_photo AS photoPerfil
      FROM photo p
      INNER JOIN user u ON p.id_user = u.id_user
      WHERE u.id_user IN (
      SELECT f.id_user
      FROM follow f
      WHERE f.id_follower=?
    ) AND p.es_publicacion = 1
      `,[id_user]);

      console.log("toma tus fotos",fotos);
      console.log("usuario", id_user);
      const respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'fotos obtenidas',
        fotos: fotos,
        
      };
      console.log("respueta",respuesta);

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
      console.log("error");
    }
  };


  const homeSearch = async (req, res) => {
    try {
        const search = req.query.q;
        const id_follower = req.params.id_user1;
        const id_user=req.params.id_user

        console.log("Entrando a la búsqueda");

        const fotos = await Pool.query(`
        SELECT p.*, u.nickname as user_name, u.id_photo as photoPerfil
        FROM photo p
        INNER JOIN user u ON p.id_user = u.id_user
        INNER JOIN follow f ON u.id_user = f.id_user
        WHERE (u.nickname LIKE ? OR u.name LIKE ? OR u.style LIKE ?) AND f.id_follower = ? AND p.es_publicacion = 1
        `, [`%${search}%`, `%${search}%`,`%${search}%`, id_follower]);
        console.log("busqueda",search)
        console.log(fotos[0]);

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

  module.exports={homeGetPhotos,homeSearch, getFollowedUsers}