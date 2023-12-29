import fs from 'fs'
const path = "./User.json";
export default class ProductManager {
  constructor() {
    this.products = path;
  }
  //consultar
  async getProducts() {
    try {
      if (fs.existsSync(this.products)) {
        const prod = await fs.promises.readFile(this.products, "utf-8");
        const prodJS = JSON.parse(prod);
        return prodJS;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  //agregar
  async addProducts(productParm) {
    try {
      //validamos los campos de entrada.
      const { code, title, description, price, thumbnail, stock } = productParm;
      if (!code || !title || !description || !price || !thumbnail || !stock) {
        console.log(
          "Se han detectado campos vacios, todos los campos son obligatorios"
        );
      } else {
        const product = {
          id: await this.#generarId(),
          // code:this.generadorSerie(9),
          code, //en el proyecto de folios el code, sera ingresado por el usuario la cual sera unica 
          title,
          description,
          price,
          thumbnail,
          stock,
        };
        const productFile = await this.getProducts()
        const veriCode = productFile.find((prod)=> prod.code === code)
        if(veriCode){
           console.log('El objeto ya existe', veriCode)
        }else{
          productFile.push(product)
          await fs.promises.writeFile(this.products, JSON.stringify(productFile))
        console.log("Objeto agregado exitosamente");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  //modificar el producto por id
  async modifyProdById(id, productUpdate){
    const productFile = await this.getProducts()
    const valueId = productFile.find(prod => prod.id === id)
    const {code, title, description, price, thumbnail, stock} = productUpdate
    if(valueId){
      valueId.code = code
      valueId.title = title
      valueId.description = description
      valueId.price = price
      valueId.thumbnail = thumbnail
      valueId.stock = stock
    }else{
      return 400
    }
    await fs.promises.writeFile(this.products, JSON.stringify(productFile))
  }
  
  //eliminar el producto por id
  async deleteProductById(id){
    const searchInFile = await this.getProducts()
    const deleteProduct = searchInFile.filter(prod => prod.id !== id)
    await fs.promises.writeFile(this.products, JSON.stringify(deleteProduct))
    if(deleteProduct){
      return console.log(' objeto eliminado')
    }
  }

  //consultar por  id
  async getProductById(id) {
    const prod = await this.getProducts()
    const searchProductById = prod.find((prod) => prod.id === parseInt(id));
    return searchProductById
    // if (searchProductById) {
    //   return console.log("Producto existente", searchProductById);
    // } else {
    //   return console.log(`Producto con el id ${id} no existe`);
    // }
  }

  //generador de codigo
  generadorSerie = (longitud) => {
    let numeros = "123456789";
    let serie = "";
    for (let x = 0; x < longitud; x++) {
      let aleatorio = Math.floor(Math.random() * numeros.length);
      serie += numeros.charAt(aleatorio);
    }
    return serie;
  };

  //generador de idPRIVATE
  async #generarId() {
    let id = 1 
    const countFile = await this.getProducts()
    if(countFile.length !== 0){
      id = countFile[countFile.length -1].id + 1
    }
    return id
  }
 
}

// const manager = new ProductManager();

// const product1 = {
//     code:12,
//     title:'Latp-Top', 
//     description:'LINUX 8G RAM, 1TR', 
//     price:10390, 
//     thumbnail:'URL', 
//     stock:5
// }

// const product2 = {
//     code:13,
//     title:'IPad', 
//     description:'IPad 8G RAM, 1TR', 
//     price:18390, 
//     thumbnail:'URL', 
//     stock:3
// }

// const product3 = {
//   code:222,
//   title:'IPhone', 
//   description:'IPhone 128G, 4g RAM, Color Blue', 
//   price: 38000, 
//   thumbnail:'URL', 
//   stock:5
// }

// const product4 = {
//   code:333,
//   title:'MacBook Air', 
//   description:'MacBook  15 pulgadas, 250, Color Blue', 
//   price: 24000, 
//   thumbnail:'URL', 
//   stock:4
// }

// async function test(){
//     console.log(await manager.getProducts())
//     // await manager.addProducts(product2)
//     // console.log(await manager.deleteProductById(2))
//     // console.log(await manager.modifyProdById(3, product4))
// }

// test()
