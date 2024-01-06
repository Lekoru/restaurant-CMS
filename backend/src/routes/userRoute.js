import {Router} from "express"
import db from "../db.js"
import {Op} from "sequelize";

const router = Router()
const {users} = db.models

router.post("/createUser", async (req, res) => {
const {userEmail, name, email, pass, role} = req.body
let user
try {
  if (!userEmail) res.status(400).json({message: "Admin email not specified."})
  user = await users.findOne({where: {Email: userEmail}})
  if(!user) res.status(400).json({message: "Creator doesn't exist."})
  if(user.Role !== "Admin") res.status(400).json({message: "You don't have permission."})
  if(!name) res.status(400).json({message: "Name not entered."})
  if(!email) res.status(400).json({message: "Email not entered."})
  if(!pass) res.status(400).json({message: "Password not entered."})
  if(!role) res.status(400).json({message: "Role not entered."})

  const newUser = await users.create({
    Name: name,
    Email: email,
    Password: pass,
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
  let user;
  try {
    //Check if user entered the email
    if (!email) res.status(400).json({message: "Missing email."})
    user = await users.findOne({where: {Email: email}})
    if (!user) res.status(400).json({message: "User doesn't exist."})
    //Check if user entered the password
    if (!password) res.status(400).json({message: "Missing password."})

    user = await users.findOne({where: {Email: email, Password: password}})
    if (!user) res.status(400).json({message: "Email or password incorrect."})

    return res.status(200).json({user: {
      id: user.id,
      Name: user.Name,
      Email: user.Email,
      Role: user.Role
    }})
  } catch (e) {
    console.error(e)
    return res.status(500).json({error: e.message})
  }
})

router.delete("/deleteUser", async (req, res) => {
  const {email, userToDelete} = req.body
  let user
  const transaction = await db.transaction()
  try {
      if (!userToDelete) res.status(400).json({message: "User to delete not specified."})
      user = await users.findOne({where: {Email: email}})
      if (!user) res.status(400).json({message: "Admin doesn't exist."})
      if (user.Role !== "Admin") res.status(400).json({message: "User don't have permission."})
      user = await users.findOne({where: {Email: userToDelete}})
      if (!user) res.status(400).json({message: "User to delete doesn't exist."})

      await user.destroy()
      await transaction.commit()
      return res.status(200).json({message: "User deleted successfully."})

    } catch (e) {
      await transaction.rollback()
      console.error(e)
      return res.status(500).json({error: e.message})
    }
})

router.patch("/changePassword", async (req, res) => {
  const {email, oldPassword, newPassword} = req.body
  let user
    const transaction = await db.transaction()
    try {
      if (!oldPassword && !newPassword){
        await transaction.rollback()
        return res.status(400).json({error: "Invalid input. Please provide old password, and new password."})
      }
      if(!email) {
        await transaction.rollback()
        return res.status(400).json({error: "Email not entered."})
      }
      user = await users.findOne({where: {Email: email}, transaction})
      if(!user) {
        await transaction.rollback()
        return res.status(400).json({error: "User doesn't exist."})
      }
      if (user.Password !== oldPassword) {
        await transaction.rollback()
        return res.status(400).json({error: "Entered wrong old password."})
      }
      if(!oldPassword) {
        await transaction.rollback()
        return res.status(400).json({error: "Old password not entered."})
      }
      if(!newPassword) {
        await transaction.rollback()
        return res.status(400).json({error: "New password not entered."})
      }

      await user.update({Password: newPassword}, {transaction})
      await transaction.commit()
      res.status(200).json({message: "Password successfully changed."})
    } catch (e) {
      console.error(e)
      await transaction.rollback()
      return res.status(500).json({error: e.message})
    }
})

router.get("/getUsers", async (req, res) => {
  const {email} = req.body
    let user
    try {
      if(!email) res.status(400).json({message: "Email not entered."})
      user = await users.findOne({where: {Email: email}})
      if(!user) res.status(400).json({message: "User doesn't exist."})
      if(user.Role !== "Admin") res.status(400).json({message: "You don't have permissions."})
      const usersList = await users.findAll({where: {Email: {[Op.not]: email}}})
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

export default router