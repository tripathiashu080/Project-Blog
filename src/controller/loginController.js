const jwt = require("jsonwebtoken");
const authorModel = require("../model/authorModel");


const loginUser = async function (req, res) {
    try{
    let userName = req.body.email;
    let password = req.body.password;
  
    let user = await authorModel.findOne({ email: userName, password: password });
    if (!userName)
      return res.status.send({
        status: false,
        msg: "username or the password is not corerct",
      });
    
      let token = jwt.sign(
    {
        auhor_Id: user._id.toString(),
        batch: "functionup",
        organisation: "thorium",
    },
      "first project"
    );
    res.setHeader("x-api-key", token);
    res.status(200).send({ status: true, data: token });
    }
    catch(err){
        res.status(500).send({Error:err.messages})
    }
}


module.exports.loginUser = loginUser
  