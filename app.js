let express= require('express');
let mysql = require('mysql');

let app = express(); 

app.use(express.json());

app.post('/api_res/api', function(req,res){
    res.send('/api_res/api');
})



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

app.get('/api_res/tbl_productos', (req,res)=>{
    conexion.query('SELECT * FROM tbl_productos', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

app.get('/api_res/tbl_productos/:id', (req,res)=>{
    conexion.query('SELECT * FROM tbl_productos WHERE id=?', [req.params.id] , (error,fila)=>{
        if(error){
            throw error;
        }else{
           res.send(fila);
           res.send(fila[0].descripción);  // para traer un solo resgistro “ descripción”
        }
    });
});

app.post('/api_res/tbl_productos',(req,res)=>{
    let data = {descripcion:req.body.descripcion, costo:req.body.costo};
    let sql = "INSERT INTO tbl_productos SET ?";
    conexion.query(sql, data, (error,results)=>{
        if(error){
            throw error;
        }else{
           res.send(results);
        }
    });
});

