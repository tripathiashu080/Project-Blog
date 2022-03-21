const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    "title": {
        type:String,
        required:true
    },
    "body": {
        type: String,
        require : true

    },
    "author_Id" :{
        type : ObjectId,
        ref : "author"
    },
    
    "tags" : {
        type : ["String"],
    },

    "category":{
        type : String,
        require : true
    },

    "subcategory" : {
        type : ["String"]
    }, 

    "deletedAt" : Date,

    "isDeleted" : {
        type : Boolean,
        default : false
    },

    "publishedAt" : Date,

    "ispublished" : {
        type : Boolean,
        default : false
    }
},
{timestamps:true})

module.exports = mongoose.model('Blog',blogSchema)