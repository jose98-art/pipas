import { Router } from "express";
import Products from '../managerProducts.js'

const prod = new Products()

const router = Router()

router.get('/',async (req,res)=>{
    const products = await prod.getProducts()
    const {limit} = req.query
    const productosMostrar = products.slice(0, limit)
    res.json({Prod:productosMostrar})
})

router.get('/:id', async (req,res)=>{
    const {id} = req.params
    const prodId = await prod.getProductById(id)
    res.json({prodId:prodId})

    // const products = await prod.getProducts()
    // const {id} = req.params
    // console.log(req.params)
    // const producMostrar = products.find(p => p.id === parseInt(id))
    // if(producMostrar){
    //     return res.json({producto:producMostrar})
    // }else{
    //     return res.json('El producto que buscas no existe')
    // }
})

router.post('/',async (req,res)=>{
    const obj = req.body
    const createObj = await prod.addProducts(obj)
    res.json({message:createObj})
})

router.put('/:pId', async (req,res)=>{
    const newObj = req.body
    const {pId} = req.params
    const update = await prod.modifyProdById(parseInt(pId), newObj)
    res.json({message:'Actualizando', update})
})

router.delete('/:id',async (req,res)=>{
    const {id} = req.params
    const idDelete = prod.deleteProductById(parseInt(id))
    res.json({idDelete})
})


export default router 