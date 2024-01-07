import {Router} from "express"
import db from "../db.js"
import {Op} from "sequelize";
import jwt from "jsonwebtoken";
import securePassword from "secure-random-password";
import bcrypt from "bcryptjs"

const router = Router()
const {users} = db.models

const hassPassword = async (password) => {
  const salt = await bcrypt.genSalt()
  const hashPass = await bcrypt.hash(password, salt)
  return hashPass
}

const authenticateToken = async (req, res) => {
  const token = req.header('auth-token')
  if (!token) return res.json({ message: 'Token not found.' })
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  if (!verified) return res.json({ message: 'Invalid token verification.' })
  const _user = await users.findOne({ where: { user_id: verified.id }})
  if (!_user) return res.status(400).json({ message: 'User doesn\'t exist' })
  return _user
}

router.post("/createUser", async (req, res) => {
const {name, email, pass, role} = req.body
let user = await authenticateToken(req, res)
try {
  if(user.Role !== "Admin") return res.status(400).json({message: "You don't have permission."})
  user = await users.findOne({where: {Email: email}})
  if (user) return res.status(400).json({message: "User with this email already exist."})
  if(!name) return res.status(400).json({message: "Name not entered."})
  if(!email) return res.status(400).json({message: "Email not entered."})
  if(!pass) return res.status(400).json({message: "Password not entered."})
  if(!role) return res.status(400).json({message: "Role not entered."})

  const hashedPass = await hassPassword(pass)

  const newUser = await users.create({
    Name: name,
    Email: email,
    Password: hashedPass,
    Role: role
  })

  return res.status(200).json(newUser)
} catch (e) {
  console.error(e)
  return res.status(500).json({error: e.message})
}
})

router.post("/login", async (req, res) => {
  const {email, password} = req.body
  try {
    if (!email) return res.status(400).json({message: "Missing email."})
    const user = await users.findOne({where: {Email: email}})
    if (!user) return res.status(400).json({message: "User doesn't exist."})
    if (!password) return res.status(400).json({message: "Missing password."})

    if (!await bcrypt.compare(password, user.Password))
      return res.status(400).json({message: 'Invalid password.'})

    const token = jwt.sign({id: user.Email}, process.env.JWT_SECRET)
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        Name: user.Name,
        Email: user.Email,
        Role: user.Role
      }
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({error: e.message})
  }
})

router.delete("/deleteUser", async (req, res) => {
  const transaction = await db.transaction()
  const {userToDelete} = req.body
  try {
    let user = await authenticateToken(req, res)
    if (user.Role !== "Admin") {
      await transaction.rollback()
      return res.status(400).json({message: "User don't have permission."})
    }
    // Overwrite user => User to delete
    user = await users.findOne({where: {Email: userToDelete}, transaction})
    if (!user) {
      await transaction.rollback()
      return res.status(400).json({message: "User to delete not specified."})
    }
    if (!user ) {
      await transaction.rollback()
      return res.status(400).json({message: "User to delete doesn't exist."})
    }
      await user.destroy(transaction)
      await transaction.commit()
      return res.status(200).json({message: "User deleted successfully."})
    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return res.status(500).json({error: e.message})
    }
})

router.patch("/changePassword", async (req, res) => {
  const transaction = await db.transaction()
  const {oldPassword, newPassword} = req.body
  try {
    const user = await authenticateToken(req, res)
      if (!oldPassword && !newPassword){
        await transaction.rollback()
        return res.status(400).json({error: "Invalid input. Please provide old password, and new password."})
      }
      if(!user) {
        await transaction.rollback()
        return res.status(400).json({error: "User doesn't exist."})
      }

      if(!oldPassword) {
        await transaction.rollback()
        return res.status(400).json({error: "Old password not entered."})
      }

      if (!await bcrypt.compare(oldPassword, user.Password)) {
        await transaction.rollback()
        return res.status(400).json({message: 'Invalid old password.'})
      }

      if(!newPassword) {
        await transaction.rollback()
        return res.status(400).json({error: "New password not entered."})
      }

      const hashedPass = await hassPassword(newPassword)
      await user.update({Password: hashedPass}, {transaction})
      await transaction.commit()
      res.status(200).json({message: "Password successfully changed."})
    } catch (e) {
      console.error(e)
      await transaction.rollback()
      return res.status(500).json({error: e.message})
    }
})
router.get("/getUsers", async (req, res) => {
  const user = await authenticateToken(req, res)
  try {
    if(user.Role !== "Admin") res.status(400).json({message: "You don't have permissions."})
    const usersList = await users.findAll({where: {Email: {[Op.not]: user.Email}}})
    usersList.map((user) => {
      user.Password = undefined
      return user
    })
    res.status(200).json({usersList})
  } catch (e) {
      console.error(e)
      return res.status(500).json({error: e.message})
  }
})
router.patch("/genUserPassword", async (req, res) => {
  const transaction = await db.transaction()
  const {userToGenPass} = req.body
  const user = await authenticateToken(req, res)
  let userToGen
    try {
      if(user.Role !== "Admin") {
        await transaction.rollback()
        return res.status(400).json({message: "You don't have permissions."})
      }
      userToGen = await user.findOne({where: {Email: userToGenPass}, transaction})
      if (!userToGen) {
        await transaction.rollback()
        return res.status(400).json({message: "User to change password doesn't exist."})
      }
      const randomPassword = securePassword.randomPassword({ length: 12 });

      userToGen.update({Password: randomPassword}, transaction)
      await transaction.commit()
      res.status(200).json({})
    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return res.status(500).json({error: e.message})
    }
})

export default router