import { Router } from 'express'
import db from '../db.js'
import dotenv from 'dotenv'
import { authenticateToken } from './userRoute.js'
dotenv.config()

const router = Router()
const { websettings } = db.models

router.patch('/changeWebSettings', async (req, res) => {
  const transaction = await db.transaction()
  const { MainPhoto, MainTitle, MainDesc, RestaurantDesc } = req.body
  try {
    const user = await authenticateToken(req, res, transaction)

    if (user.Role !== 'Admin') {
      await transaction.rollback()
      return res.status(400).json({ message: "You don't have permissions." })
    }
    if (!MainPhoto && !MainTitle && !MainDesc && !transaction) {
      await transaction.rollback()
      return res.status(400).json({ message: 'No data provided.' })
    }
    const webSettings = await websettings.findOne({
      where: { id: 1 },
      transaction,
    })

    await webSettings.update(
      {
        MainPhoto: MainPhoto || webSettings.MainPhoto,
        MainTitle: MainTitle || webSettings.MainTitle,
        MainDesc: MainDesc || webSettings.MainDesc,
        RestaurantDesc: RestaurantDesc || webSettings.RestaurantDesc,
      },
      transaction,
    )
    await transaction.commit()
    return res.status(200).json({ webSettings })
  } catch (e) {
    console.log(e)
    await transaction.rollback()
    return res.status(400).json({ e })
  }
})

router.get('/getWebSettings', async (req, res) => {
  const transaction = await db.transaction()
  try {
    const webSettings = await websettings.findOne({
      where: { id: 1 },
      transaction,
    })
    if (!webSettings) {
      const newSettings = await websettings.create(
        {
          MainPhoto: '',
          MainTitle: 'Change Title.',
          MainDesc: 'Change Description.',
          RestaurantDesc: 'Change Restaurant description.',
        },
        { transaction },
      )
      await transaction.commit()
      return res.status(200).json({ newSettings })
    }
    await transaction.commit()
    return res.status(200).json({ webSettings })
  } catch (e) {
    await transaction.rollback()
    console.log(e)
    return res.status(400).json({ e })
  }
})

export default router
