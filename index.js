//Importafciones
import express from "express";
import path from "path";

//Variables
const app = express();
const PORT = 3000;
const __dirname = path.resolve();

//Crear en el servidor un arreglo de nombres
const usuarios = [
    'Carlos',
    "Ana",
    "Pedro",
    "Lucía",
    "Miguel",
    "Sandra"
]

//Definir la carpeta “assets” como carpeta pública del servidor. 
app.use(express.static("assets"));

//Crear un servidor con Express en el puerto 3000
app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto 3000");
})

//Devolver el arreglo en formato JSON a través de la ruta /abracadabra/usuarios.
app.get("/abracadabra/usuarios", (req, res) => {
    res.json({usuarios : usuarios});
})

//Crear un middleware con la ruta /abracadabra/juego/:usuario para validar 
//que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado enel servidor.
//En caso de ser exitoso, permitir el paso a la ruta GET correspondiente, de lo contrario
//devolver la imagen “who.jpeg”.
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuario = req.params.usuario;
    const validar =usuarios.map((u) => u.toLowerCase()).includes(usuario.toLowerCase());

    if(validar){
        res.sendFile(__dirname + "/index.html");
    }else{
        res.send("<center><img src='/img/who.jpeg'><center>");
    }
})

//Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria
app.get("/abracadabra/conejo/:n", (req, res) => {
    const n = req.params.n;
    const numAleatorio = Math.floor(Math.random() * 4) + 1;
    //En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
    if (n == numAleatorio) {
        res.sendFile(__dirname + "/assets/img/conejito.jpg");
    } else {
        res.sendFile(__dirname + "/assets/img/voldemort.jpg");
    }
})

//Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al
//consultar una ruta que no esté definida en el servidor. 
app.get("*",(req,res)=>{
    res.send("<center><h1>Esta página no existe... </h1></center>");
})