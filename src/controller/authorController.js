const authorModel = require("../model/authorModel")

const createAuthor = async function(req, res){
    try{
        let data = req.body
        if(!data.fname) {return res.status(404).send({msg: "First Name is Required"})}
        if(!data.lname) {return res.status(404).send({msg: "Last Name is Required"})}
        if(!data.title) {return res.status(404).send({msg: "Title is Required"})}
        if(!data.email) {return res.status(404).send({msg: "Email is Required"})}
        if(!data.password) {return res.status(404).send({msg: "Password is Required"})}
        const validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
        if(!validateEmail){
        return res.status(400).send({msg:"Invalid Email "})
    }
    let savedata = await authorModel.create(data)
    res.send({msg:savedata})
    }
    catch(err){
        res.status(500).send({error : err.message})
    }

}

module.exports.createAuthor = createAuthor