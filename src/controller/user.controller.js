const {connection} = require("../database")

const postRegister = async (request,response) => 
{
    try
    {
        console.log(request.body)
        let params = [];
        let sql = "INSERT INTO user (name, last_name, email, password, is_tatuador) VALUES (?, ?, ?, ?, ?)";
                params = [
                request.body.name,
                request.body.last_name,
                request.body.email,
                request.body.password,
                request.body.is_tatuador
                ];
                console.log(sql);
        let [result] = await connection.query(sql,params);
        console.log(result);
        
        if (result.insertId)
            response.send(String(result.insertId));
        else 
            response.send("-1");
    }
    catch (error)
    {
        response.send(error)
    }
}

module.exports = {postRegister}