import { Router } from 'express'
import db from '../db.js'
import dotenv from 'dotenv'
import { authenticateToken } from './userRoute.js'

dotenv.config()

const router = Router()
const { menu } = db.models

router.post('/createDish', async (req, res) => {
  const transaction = await db.transaction()
  const { DishName, DishDesc, Ingredients, Photo, Price } = req.body
  try {
    const user = await authenticateToken(req, res, transaction)
    if (user && user.Role !== 'Admin' && user.Role !== 'User') {
      await transaction.rollback()
      return res.status(400).json({ message: "You don't have permissions" })
    }
    const newDish = await menu.create(
      {
        DishName,
        DishDesc,
        Ingredients,
        Photo,
        Price,
      },
      { transaction: transaction ? transaction : null },
    )

    await transaction.commit()
    return res.status(200).json({ ...newDish.dataValues })
  } catch (e) {
    console.error(e)
    await transaction.rollback()
    return res.status(400).json({ error: e.message })
  }
})

router.get('/getMenu', async (req, res) => {
  try {
    const menuList = await menu.findAll()
    if (!menuList) return res.status(400).json({ message: 'No dishes found.' })
    return res.status(200).json({ menuList })
  } catch (e) {
    console.error(e)
    return res.status(400).json({ error: e.message })
  }
})

router.patch('/editDish', async (req, res) => {
  const transaction = await db.transaction()
  const { id, DishName, DishDesc, Ingredients, Photo, Price } = req.body
  try {
    if (!DishName && !DishDesc && !Ingredients && !Photo && !Price) {
      await transaction.rollback()
      return res.status(400).json({ message: 'No data provided.' })
    }
    const user = await authenticateToken(req, res, transaction)
    if (user.Role !== 'Admin' && user.Role !== 'User') {
      await transaction.rollback()
      return res.status(400).json({ message: 'No permissions.' })
    }
    if (!id) {
      await transaction.rollback()
      return res.status(400).json({ message: 'Dish not found.' })
    }
    const dish = await menu.findOne({ where: { id }, transaction })
    if (!dish) {
      await transaction.rollback()
      return res.status(400).json({ message: "Dish doesn't exist." })
    }

    const editedDish = await dish.update(
      {
        DishName: DishName || dish.DishName,
        DishDesc: DishDesc || dish.DishDesc,
        Ingredients: Ingredients || dish.Ingredients,
        Photo: Photo || dish.Photo,
        Price: Price || dish.Price,
      },
      transaction,
    )
    return res.status(200).json({ editedDish })
  } catch (e) {
    console.error(e)
    await transaction.rollback()
    return res.status(400).json({ error: e.message })
  }
})

router.delete('/deleteDish', async (req, res) => {
  const transaction = await db.transaction()
  const id = req.header('id')
  try {
    const user = await authenticateToken(req, res, transaction)
    if (user.Role !== 'Admin' && user.Role !== 'User') {
      await transaction.rollback()
      return res.status(400).json({ message: 'No permissions.' })
    }
    if (!id) {
      await transaction.rollback()
      return res.status(400).json({ message: 'Dish not found.' })
    }
    const dish = await menu.findOne({ where: { id }, transaction })
    if (!dish) {
      await transaction.rollback()
      return res.status(400).json({ message: "Dish doesn't exist." })
    }
    await dish.destroy({ transaction })
    await transaction.commit()
    return res.status(200).json({ message: 'Dish deleted successfully.' })
  } catch (e) {
    console.error(e)
    await transaction.rollback()
    return res.status(400).json({ error: e.message })
  }
})

export default router
