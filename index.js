const express = require("express")
require("dotenv").config();
const { dbConnection } = require("./database/config")
const cors = require("cors")

// crear el servidor de express

const app = express();

// Base de datos

dbConnection()

// CORS
app.use(cors())

// Directorio publico

app.use( express.static("public"));

// Lectura y parseo del body

app.use(express.json())

// rutas

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));


app.get("*", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
});

// escuchar peticiones
const port= process.env.PORT || 4000
app.listen( port, ()=>{
    console.log(`servidor corriendo en puerto ${ port }`);
});

