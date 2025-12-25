import express from 'express'
import { addToCart,getCartCount,getAll,deleteItem,deleteAll } from '../controllers/cartController';

export const cartRouter = express.Router();
cartRouter.post('/add',addToCart);
cartRouter.get('/cart-count',getCartCount)
cartRouter.get('/',getAll)
cartRouter.delete('/:itemId',deleteItem)
cartRouter.delete('/all',deleteAll)
