class Productos {
    constructor(){
        this.item = [];
        }

    listarTodos(){
            try{
                return this.item.length!=0 ? this.item : {error : 'no hay productos cargados'}
                
               }catch(err){
                console.log('Hubo un error en la funcion leer todo'); 
               }
    }

    BuscarId(id){
        try{
            return id <= this.item.length ? this.item[id-1] : {error: "producto no encontrado'" }
            
           }catch(err){
            console.log('Hubo un error en la funcion Buscar por ID'); 
           }
    }

    guardar(newProduct){
        try{
           if(this.item.length === 0){
            newProduct.id=1;
             }else{
            newProduct.id=this.item[this.item.length-1].id+1;
             }

            this.item.push(newProduct);
            return this.item;

           }catch(err){
            console.log('Hubo un error en la funcion guardar'); 
           }
    }
    actualizar(newProduct,id){
    try{
            newProduct.id=id;
            return id <= this.item.length ? (this.item[id-1]=newProduct) : {error: "producto no encontrado para actualizar'" }

           }catch(err){
            console.log('Hubo un error en la funcion actualizar'); 
           }
    }


    borrar(id){
        try{
            return id <= this.item.length ? (this.item.splice(id-1,1)) : {error: "producto no encontrado para borrar'" }

           }catch(err){
            console.log('Hubo un error en la funcion borrar'); 
           }
    }

}
// exporto una instancia de la clase
module.exports = new Productos();
