const { commerce } = require('faker');
const faker = require('faker');
faker.locale='es';

class Faker {

    constructor() {

    }
    
    generarProductos(cant) {
        let productos=[];
        for (let i = 0; i < cant; i++) {
            let q = faker.commerce.product();
            let p ={
                title: q,//Nombre
                price: faker.commerce.price(0, 1000, 1, ''),//Precio
                thumbnail: faker.image.unsplash.objects(250, 250, `${q}`),//Foto url
            }
        
             productos.push(p);
        }
        return productos;
    }
}

module.exports = new Faker();