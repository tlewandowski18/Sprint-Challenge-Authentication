const router = require('express').Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./users-model")

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({username})
    if (user) {
      res.status(409).json({
        message: "Username is already taken"
      })
    }
    const newUser = await Users.add(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findBy({username})
    const validPassword = await bcrypt.compare(password, user.password)
    console.log(validPassword)
    if (!user || !validPassword) {
      res.status(401).json({
        message: "Invalid Credentials"
      })
    }
    const tokenPayload = {
      userId: user.id,
      userAccess: "normal"
    }
    res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))
    res.json({
      message: `Welcome ${user.username}`
    })
  } catch(err) {
    next(err)
  }
});

module.exports = router;
