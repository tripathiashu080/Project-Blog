const blogModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")
const { isModuleNamespaceObject } = require("util/types")
const { create } = require("lodash")



/*------------CREATE BLOG-------------------*/
const createBlog = async function(req,res){
    try{
    let data = req.body
    let id = req.body.author_Id
    let validate = await authorModel.findById(id)
    if(!validate){
        console.log(validate)
        return res.status(400).send({msg:"Invalid id"})
    }
    let savedata = await blogModel.create(data)
    res.status(200).send({msg : savedata})
}catch(err){
    res.status(500).send({msg:err.message})
}
}


/*---------------- GET DETAILS OF THE BLOGS------------------*/
const getBlogs = async function(req, res){
    try{
        let query = req.query
        let filter ={
            isdeleted : false,
            ispublished : true,
            ...query
        };
        let filterByquery = await blogModel.find(filter)
        if(filterByquery.length == 0){
            return res.status(400).send({msg:"Blog Not Found"})
        }
        else{
            return res.status(200).send({msg:filterByquery})
        }

    }catch(err){
        res.status(500).send({statue:false , msg:err.message})
    }
}


/*----------------- UPDATE THE BLOGS------------------------*/
const updateblog = async function(req, res){
    try{
        const blogId = req.params.blogId
        const Details = req.body
        const validId = await blogModel.findById(blogId)
        if (!validId){
            return res.status(400).send({status:false, msg:"blog Id invalid"})
        }
        const updatedDetails = await blogModel.findOneAndUpdate(
            {_id : blogId},
            {title : Details.title, body : Details.body, tags : Details.tags,
            subcategory : Details.subcategory, ispublished : true, publishedAt : new Date()},
            {new : true, upsert : true})
        res.status(201).send({status:true, data:updatedDetails})
    }
    catch(error){ res.status(500).send({status:false, msg:error.message})}
}

/*------------- DELETE BY ID-------------------------------*/
const deletebyId = async function(req,res){
    try{
        let blogId = req.params.blogId
        const validId = await blogModel.findById(blogId)
      if (!validId) {
        return res.status(404).send({msg:"blog ID is Invalid"})
      }
    const deleteData = await blogModel.findOneAndUpdate({ _id: blogId },{isDeleted : true, deletedAt : new Date()},{new : true});
    res.status(200).send({ status: true, data: deleteData })
}catch(err){
    res.status(500).send({Error : err.message})
    }
}


/*-------------- DELETE BY QUERY PARAMETERS------------------------*/
const deletebyQuery = async function(req,res){
    try{   
            let query = req.query
            let filter = {...query}
            let filterByquery = await blogModel.find(filter)
            if(filterByquery.length == 0){
                return res.status(400).send({msg:"Blog Not Found"})
            }
            else{
                let deletedDetails = await blogModel.findOneAndUpdate(filter, {isDeleted : true, deletedAt :new Date()}, {new : true})
                return res.status(200).send({msg:deletedDetails})
            }
    }catch(err){
        res.status(500).send({Error : err.message})
    }
}   



/*---------- ALL MODULES----------------------------*/
module.exports.createBlog = createBlog
module.exports.getBlogs = getBlogs
module.exports.updateblog = updateblog
module.exports.deletebyId = deletebyId
module.exports.deletebyQuery = deletebyQuery