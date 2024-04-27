import express from "express";
import path from "path";
import fs, { readFile } from "fs";

const app = express();
const __dirname = path.resolve();

app.use(express.static("assets"));

let usuarios;

fs.readFile("usuarios.json", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        usuarios = JSON.parse(data);
    }
})

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
})

app.get("/abracadabra/usuarios", (req, res) => {
    res.sendFile(__dirname + "/usuarios.json");
})

app.get("/abracadabra/juego/:usuario", (req, res) => {
    const usuario = req.params.usuario;
    if(usuario && usuarios.usuarios.includes(usuario)){
        res.sendFile(__dirname + "/index.html");
    }else{
        res.send("<center><h1>Sorry, ese usuario no existe :/ </h1></center> <center><img src='/img/who.jpeg'><center>");
    }
})

app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = req.params.n;
    const numAleatorio = Math.floor(Math.random() * 4) + 1;
    if (n == numAleatorio) {
        res.sendFile(__dirname + "/assets/img/conejito.jpg");
    } else {
        res.sendFile(__dirname + "/assets/img/voldemort.jpg");
    }
})
// /abracadabra/conejo/:n:  

app.get("*",(req,res)=>{
    res.send("<center><h1>Sorry, aquí no hay nada :/ </h1></center>");
})