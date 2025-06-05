const mongoose = require ('mongoose')
const studentSchema = new mongoose.Schema({
    _id:{type:String},
    name:{type:String},
    date_of_birth:{type:date},
   gender:{type:String},
   degree:{
    type:String,
    require:true,
    ref:'Degree'
   },
   enroled_courses:[{type:mongoose.Types.ObjectId,ref:'courses'}] 
})
const Students = mongoose.model('students',studentSchema)
const BIT= new Student({
    _id:'2021ICT01',
    name:'Kolins',
    date_of_birth:'01.05.1995',
    gender:'male',
    //degreeId:'FAS2000ICT',
    enroled_courses:['68282fb9c080891828ddf30d','6828302f3e5e2eb975d27c08']
})
//Kolins.save()
module.exports = Student;

