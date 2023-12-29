import fs from 'fs'

const pathJSON = './carts.json'

export default class CarstManager {
    constructor(){
        this.path = pathJSON
    }

    async getProdCarts(){
        try {
            if(fs.existsSync(this.path)){
                const prodCart = await fs.promises.readFile(this.path, 'utf-8')
                const prodJson = JSON.parse(prodCart)
                return prodJson
            }else{
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async createCart(){
        const existFile = await this.getProdCarts()
        const newCart = {
            id: await this.#generateId(),
            products:[]
        }
        existFile.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(existFile))
        return newCart
    }

    async addCart(idCart, idProd){
        const cartFile = await this.getProdCarts()
        const cartUpdate = cartFile.find(p => p.id === idCart) ?? 400
        if(cartUpdate === 400){
            return cartUpdate
        }else if(cartUpdate['products'].some(p=>p.id===idProd)){
            let prodQuantity = cartUpdate['products'].find(p => p.id === idProd)
            prodQuantity['Quantity']++
        }else{
            let prodCart ={
                id: idProd,
                Quantity:1
            }
            cartUpdate['products'].push(prodCart)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(cartFile))
        return cartUpdate
    }


    async #generateId (){
        let id = 1
        const cartFile = await this.getProdCarts()
        if(cartFile.length !== 0){
            id = cartFile[cartFile.length -1 ].id +1
        }
        return id
    }
}