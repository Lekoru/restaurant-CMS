import { Router } from 'express'
import db from '../db.js'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import securePassword from 'secure-random-password'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const router = Router()
const { users } = db.models

const hashPassword = async password => {
  const salt = await bcrypt.genSalt()
  return await bcrypt.hash(password, salt)
}

export const authenticateToken = async (req, res, transaction) => {
  const token = req.header('auth-token')
  if (!token) {
    await transaction.rollback()
    return res.json({ message: 'Token not found.' })
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (!verified) {
      await transaction.rollback()
      return res.json({ message: 'Invalid token verification.' })
    }
    const _user = await users.findOne({
      where: { id: verified.id, Email: verified.Email },
      transaction,
    })

    if (!_user) {
      await transaction.rollback()
      return res.status(400).json({ message: "User doesn't exist" })
    }
    return _user
  } catch (e) {
    await transaction.rollback()
    console.error('JWT Verification Error:', e.message)
    return res.status(401).json({ message: 'Invalid token.' })
  }
}

router.post('/createUser', async (req, res) => {
  const transaction = await db.transaction()
  const { Name, Email, Password, Role } = req.body
  let user = await authenticateToken(req, res, transaction)
  try {
    if (user.Role !== 'Admin')
      return res.status(400).json({ message: "You don't have permission." })
    user = await users.findOne({ where: { Email }, transaction })
    if (user)
      return res
        .status(400)
        .json({ message: 'User with this email already exist.' })
    if (!Name) return res.status(400).json({ message: 'Name not entered.' })
    if (!Email) return res.status(400).json({ message: 'Email not entered.' })
    if (!Password)
      return res.status(400).json({ message: 'Password not entered.' })
    if (!Role) return res.status(400).json({ message: 'Role not entered.' })
    if (Role !== 'Admin' && Role !== 'User')
      return res.status(400).json({ message: 'Invalid role.' })

    const hashedPass = await hashPassword(Password)

    const newUser = await users.create(
      {
        Name,
        Email,
        Password: hashedPass,
        Role,
      },
      { transaction },
    )

    return res.status(200).json({ ...newUser.dataValues, Password: undefined })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.message })
  }
})

router.post('/login', async (req, res) => {
  const { Email, Password } = req.body
  try {
    if (!Email) return res.status(400).json({ message: 'Missing email.' })
    const user = await users.findOne({ where: { Email: Email } })
    if (!user) return res.status(400).json({ message: "User doesn't exist." })
    if (!Password) return res.status(400).json({ message: 'Missing password.' })

    if (!(await bcrypt.compare(Password, user.Password)))
      return res.status(400).json({ message: 'Invalid password.' })

    const token = jwt.sign(
      { id: user.id, Email: user.Email },
      process.env.JWT_SECRET,
    )
    return res.status(200).json({
      token,
      user: { ...user.dataValues, Password: undefined },
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: e.message })
  }
})

router.delete('/deleteUser', async (req, res) => {
  const transaction = await db.transaction()
  const userToDelete = req.header('userToDelete')
  try {
    let user = await authenticateToken(req, res, transaction)
    if (user.Role !== 'Admin') {
      await transaction.rollback()
      return res.status(400).json({ message: "User don't have permission." })
    }
    // Overwrite user => User to delete
    user = await users.findOne({ where: { Email: userToDelete }, transaction })
    if (!user) {
      await transaction.rollback()
      return res.status(400).json({ message: 'User to delete not specified.' })
    }
    if (!user) {
      await transaction.rollback()
      return res.status(400).json({ message: "User to delete doesn't exist." })
    }
    await user.destroy(transaction)
    await transaction.commit()
    return res.status(200).json({ message: 'User deleted successfully.' })
  } catch (e) {
    await transaction.rollback()
    console.error(e)
    return res.status(500).json({ error: e.message })
  }
})

router.patch('/changePassword', async (req, res) => {
  const transaction = await db.transaction()
  const { oldPassword, newPassword } = req.body
  try {
    const user = await authenticateToken(req, res, transaction)
    if (!oldPassword && !newPassword) {
      await transaction.rollback()
      return res.status(400).json({
        error: 'Invalid input. Please provide old password, and new password.',
      })
    }

    if (!oldPassword) {
      await transaction.rollback()
      return res.status(400).json({ error: 'Old password not entered.' })
    }

    if (!(await bcrypt.compare(oldPassword, user.Password))) {
      await transaction.rollback()
      return res.status(400).json({ error: 'Invalid old password.' })
    }

    if (!newPassword) {
      await transaction.rollback()
      return res.status(400).json({ error: 'New password not entered.' })
    }

    const hashedPass = await hashPassword(newPassword)
    await user.update({ Password: hashedPass }, { transaction })
    await transaction.commit()
    res.status(200).json({ message: 'Password successfully changed.' })
  } catch (e) {
    console.error(e)
    await transaction.rollback()
    return res.status(500).json({ error: e.message })
  }
})

router.get('/getUsers', async (req, res) => {
  const transaction = await db.transaction()
  const user = await authenticateToken(req, res, transaction)
  try {
    if (user.Role !== 'Admin') {
      await transaction.rollback()
      return res.status(400).json({ message: "You don't have permissions." })
    }
    const usersList = await users.findAll({
      where: { Email: { [Op.not]: user.Email } },
    })
    usersList.map(user => {
      user.Password = undefined
      return user
    })
    await transaction.commit()
    res.status(200).json({ usersList })
  } catch (e) {
    console.error(e)
    await transaction.rollback()
    return res.status(500).json({ error: e.message })
  }
})
router.patch('/genUserPassword', async (req, res) => {
  const transaction = await db.transaction()
  const { userToGenPass } = req.body
  const user = await authenticateToken(req, res, transaction)
  let userToGen
  try {
    if (user.Role !== 'Admin') {
      await transaction.rollback()
      return res.status(400).json({ message: "You don't have permissions." })
    }
    userToGen = await users.findOne({
      where: { Email: userToGenPass },
      transaction,
    })
    if (!userToGen) {
      await transaction.rollback()
      return res
        .status(400)
        .json({ message: "User to change password doesn't exist." })
    }
    const randomPassword = securePassword.randomPassword({ length: 12 })

    const hashedPass = await hashPassword(randomPassword)

    await userToGen.update({ Password: hashedPass }, transaction)
    await transaction.commit()
    res.status(200).json({ newPassword: randomPassword })
  } catch (e) {
    await transaction.rollback()
    console.error(e)
    return res.status(500).json({ error: e.message })
  }
})

export default router
