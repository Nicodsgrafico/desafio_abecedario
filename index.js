import express from "express";

const app = express();

app.use(express.static("/assets"));


app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
})

app.get("*",(req,res)=>{
    res.send("<center><h1>Sorry, aquí no hay nada :/ </h1></center>");
})