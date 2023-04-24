const express = require("express");
// const { check } = require('express-validator');
const router = express.Router();
const multer = require("multer");
const UserModel = require("../models/UserModel");
// const usersController = require("../controllers/uploadController");
const { ObjectId } = require("mongodb");
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage
const dbUrl = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.f8yjf.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const mongoose = require("mongoose");
const redis = require('redis');
const { MongoClient } = require('mongodb');
const clients = redis.createClient({url: "rediss://red-ch3djktgk4qarqmkffpg:68yqeaebrdwL4r6NQfgnzGUhO939y4RL@singapore-redis.render.com:6379"});
clients.connect()


let storage = new GridFsStorage({  
  url: dbUrl,  
  file: (req, file) => { 
    // let random = Math.floor((10000*Math.random()));   
    console.log("f")
         return {     
              bucketName: 'test',    
              filename: file.originalname
            }  
          }
}); 

let upload = multer({storage: storage});  

router.post("/add", upload.single("photo"), async (req, res) => {
  const { id, name } = req.body;
  let files = "";
  try {
    const client = await MongoClient.connect(dbUrl);
    const db = client.db(process.env.DATABASE);
    const collection = db.collection('test.files');    
    const collectionChunks = db.collection('test.chunks');
    
    collection.find({ filename: name }).toArray(async function(err, docs) {        
      if(!docs || docs.length === 0){        
        res.status(400).json({ error: "no image found" });    
      } else {
        collectionChunks.find({ files_id: docs[0]._id }).sort({ n: 1 }).toArray(async function(err, chunks) {          
          let fileData = [];
          // console.log(chunks+" "+ docs);          
          for(let i = 0; i < chunks.length; i++){            
            fileData.push(chunks[i].data.toString('base64'));          
          }
          
          let finalFile = 'data:' + docs[0].contentType + ';base64,' + fileData.join('');  
          files += finalFile;
          // console.log(finalFile);
          const newid = ObjectId(id);

          await UserModel.updateOne(
            { _id: newid },
            { $set: { photo:files } }
          );
          console.log(files);
          await clients.del(`photos=${id}`)
          res.json({ files: finalFile });
        })    
      }
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});


module.exports = router;

