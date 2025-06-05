const express=require('express');
const router = express.Router();
const Student = require('../models/Student');
const { mongoose } = require('mongoose')

router.get('/', async (req,res)=>{
    try {
        const results = await Student.find()
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const results = await Student.findById(id)
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.get('/course', async (req,res)=>{
    try {
        const results = await Student.find({},{name:1,degreeID:0}).populate("degreeId").populate("enroled_courses")
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})


router.get('/code/:cid', async (req,res)=>{
    try {
        const cid = req.params.cid
        const results = (await Student.find({code:cid}))
        const count = results.length
        console.log(count)
        if (results) {
            if (count>0){
                res.status(200).json(results)
            }
            else {
                res.status(404).send("Sorry, No Data Found !")
            }  
           
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.post('/', async (req,res)=>{
    try {
        const {name,date_of_birth,gender,degree} = req.body
        if (!name || !date_of_birth || !gender || !degree) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await Student.create({name,date_of_birth,gender,degree})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).send("Invaild ID !")
        }
        const ustudent = await Student.findById(id)
        const {name,date_of_birth,gender,degree} = req.body
        if (!name || !date_of_birth || !gender || !degree) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await ustudent.updateOne({name,date_of_birth,gender,degree})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})


router.delete('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).send("Invaild ID !")
        }
        const dstudent = await Student.findById(id)
        const results = await dstudent.deleteOne(dstudent).catch(
            (error)=>{ return res.status(500).json(error)}
        )
        res.status(200).json(results)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
module.exports=router 
