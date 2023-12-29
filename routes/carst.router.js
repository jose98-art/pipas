import {Router} from 'express'
import cart from '../manageCarts.js'

const cartManager = new cart()

const router = Router()

router.get('/', async (req,res)=>{
    const cartFile = await cartManager.getProdCarts()
    res.json({messsage: cartFile})
})

//la funcione para extraer el prod por id, moverlo a mangerCarts y usar la instancia solamente
router.get('/:idCart', async (req,res)=>{
    const {idCart} = req.params
    const idp = await cartManager.getProdCarts()
    const p = idp.find(p => p.id === idCart)
    return p
})
router.post('/',async (req,res)=>{
    const pCart = await cartManager.createCart()
    res.status(200).json(pCart)
})


router.post('/:cid/product/:pid',async (req,res)=>{
    const {cid,pid} = req.params
    const pCreate = await cartManager.createCart(Number(cid), Number(pid))
    res.json({message:'producto agregado', pCreate})
})




export default router