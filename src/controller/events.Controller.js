const { Pool } = require("../database");

const postEvent=async(req,res)=>{
    const id_user=req.params.id_user;
    const {photo,title,date,place}=req.body; 
    console.log("entrando");
    try{
        await Pool.query("INSERT INTO evento(photo,title,date,place,id_user) VALUES (?,?,?,?,?) ",[photo,title,date,place,id_user])
       respuesta={error:false, 
        codigo:200, mensaje:
        "Evento añadido"}
        res.send(respuesta);
        console.log("evento añadido");
    }catch(error){
        respuesta= {error:true, codigo:200, mensaje:"error al añadir evento",error}
        console.log(error);
        res.send(respuesta);
        console.log("error al añadir evento");
    }
}

const deleteEvent = async (req, res) => {
    const { id_evento } = req.params;
  
    try {
      await Pool.query('DELETE FROM evento WHERE id_evento = ?', [id_evento]);
  
      const respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Evento eliminado',
      };
      res.send(respuesta);
    } catch (error) {
      const respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Error al eliminar evento',
        error: error.message,
      };
      console.log(error);
      res.send(respuesta);
    }
  };

  const getEvents = async (req, res) => {
    try {
      console.log("entrando");
      const eventos = await Pool.query('SELECT * FROM evento');
      console.log("toma tus eventos",eventos);
  
      const respuesta = {
        error: false,
        codigo: 200,
        mensaje: 'Eventos obtenidos',
        eventos: eventos,
        
      };
      console.log("respueta",respuesta);

      res.send(respuesta);
    } catch (error) {
      const respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Error al obtener eventos',
        error: error.message,
      };
      console.log(error);
      res.send(respuesta);
      console.log("error");
    }
  };

  const searchEvent = async (req, res) => {
    const { search } = req.query;
  
    try {
      const eventos = await Pool.query(
        `SELECT * FROM evento
        INNER JOIN user ON evento.id_user = user.id_user
        WHERE evento.title LIKE ? OR user.name LIKE ?`,
        [`%${search}%`, `%${search}%`]
      );
  
      const respuesta = {
        error: false,
        codigo: 200,
  
        mensaje: 'Eventos encontrados',
        eventos: eventos,
      };
      res.send(respuesta);
    } catch (error) {
      const respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Error al buscar eventos',
        error: error.message,
      };
      console.log(error);
      res.send(respuesta);
    }
  };

  module.exports={postEvent,deleteEvent,getEvents,searchEvent}