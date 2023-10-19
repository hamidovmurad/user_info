const express = require('express')
const router = express.Router()
const User = require('../models/user')

//Getting all
router.get('/', async (req,res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

//Get one
router.get('/:id', getUser ,(req,res) => {
   res.json(res.user)
})

//Creat one
router.post('/', async (req,res) => {
   
        const user = new User({
            name: req.body.name,
            surname: req.body.surname
        })

        try{

            const newUser = await user.save()
            res.status(201).json(newUser)

    }catch(err){
        res.status(400).json({message : err.message})
    }

})

//Update one
router.patch('/:id', getUser, async(req,res) => {
    if(req.body.name != null){
        res.user.name = req.body.name
    }

    if(req.body.surname != null ){
        res.user.surname = req.body.surname
    }

    try{
        const updateUser = await res.user.save()
        res.json(updateUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }


})

//Delete one
router.delete('/:id', getUser, async (req,res) => {
    try{
        await res.user.deleteOne()
        res.json({message:'Deleted subscriber'})
    }catch(err){
        res.status(500).json({message:err.message})
    }

})


async function getUser(req, res, next){
    let user
    try{
        user = await User.findById(req.params.id)
        if(user==null){
           return res.status(404).json({message:'user not found'})
        }
    }catch(err){
        return  res.status(500).json({message : err.message})
    }

    res.user = user
    next()
}


module.exports = router