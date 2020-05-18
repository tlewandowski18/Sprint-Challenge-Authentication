/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken")

module.exports = async (req, res, next) => {
  try {
    const authError = {
      message: "You shall not pass!"
    }
    const token = req.cookies.token
    if (!token) {
      res.status(401).json(authError)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
      if(err) {
        res.status(401).json(authError)
      }
      req.token = decodedPayload
      next()
    })

  } catch(err) {
    next(err)
  }
};
