const jwt = require("jsonwebtoken")



const authenticate = function(req, res, next){
    try{
    let token = req.headers['x-api-key']
    if(!token) return res.status(400).send({msg:"Token is required"})
    next()
}catch(err){
    res.status(500).send({Error:err.message})
}
}


const authorize = function(req, res, next){
    try{
    let token = req.headers['x-api-key']
    let decodedToken = jwt.verify(token, "first project")
    let userToBeModified = req.params.author_Id
    let userLoggedIn = decodedToken.author_Id
    if(userToBeModified !== userLoggedIn) return res.status(400).send({status: false, msg:"User is not allowed for logged in"})
    next()
}catch(err){
    res.status(500).send({Error : err.message})
}
}



module.exports.authenticate = authenticate
module.exports.authorize = authorize