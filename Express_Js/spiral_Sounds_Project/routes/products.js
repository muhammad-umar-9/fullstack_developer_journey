import express from 'express'
import { getGenres, getProducts } from '../controllers/productsControllers.js'

export const productsRouter = express.Router()

productsRouter.get('/genres', getenres)
productsRouter.get('/', getProducts)
