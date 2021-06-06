const express = require('express');
const handlebars = require('express-handlebars');
const productos = require('./api/productos');

// creo una app de tipo express
const app = express();
// incorporo el router
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//establecemos la configuración de handlebars
app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);
app.set("view engine","hbs");// en esta instruccion registramos nuestro motor
app.set("views", "./views"); //en esta instruccion especificamos en que carpeta estan las vistas o planillas


///0
router.get("/", (req, res) => {
    res.render('vista_inicio');
});

// A
router.get('/listar', (req, res) => {
    if(productos.item.length === 0){
        res.render('vista', {productos: productos.item, hayProductos: false});
    }else{
        res.render('vista', {productos: productos.item, hayProductos: true});
    }
});

//B
router.get('/listar/:id', (req, res) => {
    //res.json(productos.BuscarId(req.params.id)) 
    if(productos.item.length === 0 || req.params.id > productos.item.length  ){
        res.render('vista_id', {productos: [productos.BuscarId(req.params.id)], hayProductos: false});
    }else{
        res.render('vista_id', {productos: [productos.BuscarId(req.params.id)], hayProductos: true});
    }
});

//C
router.get('/guardar', (req, res) => {
    res.render('index_guardar');
});
router.post('/guardar', (req, res) => {
productos.item=productos.guardar(req.body);
res.redirect('/api/productos/guardar');
});

//D
router.put('/actualizar/:id', (req, res) => {
    res.send(productos.actualizar(req.body,req.params.id))
    });
//E 
router.delete('/borrar/:id', (req, res) => {
    res.send(productos.borrar(req.params.id));
});

app.use('/api/productos', router);

// pongo a escuchar el servidor en el puerto indicado
const puerto = 8080;

const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});
