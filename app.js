let express= require('express');
let mysql = require('mysql');

let app = express(); 

app.use(express.json());


app.listen('3000', function(){
    console.log('Servidor OK');
})

app.get('/api_res/api', function(req,res){
    res.send('/api_res/api');
})



let conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'api'
});
// Probar la conexión
conexion.connect(function(error){
   if(error){
       throw error;
   } else{
       console.log('Conexión exitosa');
   }
});

