const mongoose = require ('mongoose')
const courseSchema = new mongoose.Schema({
    code:{type:String,require:true},
    name:{type:String,require:true},
    credits:{type:Number,require:true},
    description:{type:String}
})

const Course = mongoose.model('courses',courseSchema)
const webservice = new Course({
    code :'IT2234',
    name:'Practical of Web service',
    credits:3,
    description:'build a REST API with NodeJS technology'
})
webservice.save()
module.exports = Course;
