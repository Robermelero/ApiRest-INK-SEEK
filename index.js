const app = require("./src/app");

app.listen (process.env.PORT || 3000)
{
    console.log("Server listen on port " + app.get("port"))
};