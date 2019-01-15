const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Employee = require('../models/employee') 
const Project = require('../models/project') 
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const db = "mongodb://userhuzaifa:pwdhuz1@ds253104.mlab.com:53104/eventdb"


mongoose.connect(db, err => {
    if(err){
        console.log('error : '+err);
    }else{
        console.log('successfully connected to MongoDB');
    }
})


function verifyToken(req, res, next){
    // if(!req.headers.authorization){
    //     return res.status(401).send('unauthorized request!')
    // }
    let token = req.headers.authorization.split(' ')[1]
    
    
    if(token === 'null'){
        return res.status(401).send('unauthorized request!!')
    }else{
        let payload= jwt.verify(token, 'secretKey')
        if(!payload){
            return res.status(401).send('unauthorized request!!!!')
        }else{
             req.userId= payload.subject 
             next()
        }
    }
}



router.get('/', function(req, res){
    res.send('Api running');
})

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        }else{
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/registerEmployee', (req, res) => {
    let employeeData = req.body;
    let employee = new Employee(employeeData)
    employee.save((error, registeredUser) => {
        if(error){
            console.log(error);
        }else{
            res.status(200).send(registeredUser)
        }
    })
})


router.put('/registeredEmployee/:id', (req,res) => {
    let employeeData = req.body
    Employee.findByIdAndUpdate(req.params.id, {$set: employeeData}, {new : true}, (err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error in update :'+JSON.stringify(err, undefined, 2 ));}    
    } )
} )


router.delete('/registeredEmployee/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error in delete :'+JSON.stringify(err, undefined, 2 ));}           
    })
})




router.get('/registeredEmployee/:id', (req, res) => {

    // if(!ObjectId.isValid(req.params.id))
    // return res.status(400).send(`no record with id : ${req.params.id}  ` )


    Employee.findById(req.params.id, (err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error:'+JSON.stringify(err, undefined, 2 ));}
    });
});






router.get('/registeredEmployee', (req, res) => {
    Employee.find((err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error:'+JSON.stringify(err, undefined, 2 ));}
    });
});




// employee end


router.post('/login', (req, res)=>{
    userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send('Incorrect Email ID')
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Incorrect Password')
                }else{
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/dashboard', verifyToken, (req,res)=>{
    let events = [{"id" : "1" , "name" : "a"}, {"id" : "2", "name": "b" }]
res.json(events)
})


// auth end



router.post('/registerProject', (req, res) => {
    let projectData = req.body;
    let project = new Project(projectData)
    project.save((error, registeredProject) => {
        if(error){
            console.log(error);
        }else{
            res.status(200).send(registeredProject)
        }
    })
})


router.put('/registeredProject/:id', (req,res) => {
    let projectData = req.body
    Project.findByIdAndUpdate(req.params.id, {$set: projectData}, {new : true}, (err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error in update :'+JSON.stringify(err, undefined, 2 ));}    
    } )
} )


router.delete('/registeredProject/:id', (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error in delete :'+JSON.stringify(err, undefined, 2 ));}           
    })
})




router.get('/registeredProject/:id', (req, res) => {

    // if(!ObjectId.isValid(req.params.id))
    // return res.status(400).send(`no record with id : ${req.params.id}  ` )


    Project.findById(req.params.id, (err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error:'+JSON.stringify(err, undefined, 2 ));}
    });
});






router.get('/registeredProject', (req, res) => {
    Project.find((err, docs) => {
        if(!err){ res.send(docs);}
        else { console.log('error:'+JSON.stringify(err, undefined, 2 ));}
    });
});






module.exports = router