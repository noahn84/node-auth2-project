const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")
const { restrict } = require("./users-middleware")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
  try {
    res.json(await Users.find())
  } catch(err) {
    next(err)
  }
})

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, department_id } = req.body
    const user = await Users.findByUsername(username)

    if (user) {
      return res.status(409).json({
        message: `The username "${user.username}" is already taken`,
      })
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 14),
      department_id,
    })

    res.status(201).json(newUser)
  } catch(err) {
    next(err)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findByUsername(username)

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      })
    }

    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      })
    }

    const token = jwt.sign({
      userID: user.id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.json({
      message: `Welcome back, ${user.username}!`
    })
  } catch(err) {
    next(err)
  }
})

module.exports = router