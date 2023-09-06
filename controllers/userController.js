const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {loginValidate, registerValidate} = require('./validate')

const userController = {
    register: async function (req, res) {

        const {error} = registerValidate(req.body)
        if (error) {return res.status(400).send(error.message)}

        const selecterUser = await User.findOne({email: req.body.email})
        if (selecterUser) return res.status(400).send("Email already exists!")

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
            //A senha está criptografada
        })

        try {
            const savedUser = await user.save();
            res.send(savedUser)
        } catch (error) {
            res.status(400).send(error)
        }

    },


    login: async function (req, res) {

        const {error} = loginValidate(req.body)
        if (error) {return res.status(400).send(error.message)}

        const selecterUser = await User.findOne({email: req.body.email})
        if (!selecterUser) return res.status(400).send("Email or Password incorrect!")
   
        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, selecterUser.password)
        if(!passwordAndUserMatch) return res.status(400).send("Email or Password incorrect!")

        const token = jwt.sign({_id:selecterUser.id, admin:selecterUser.admin}, process.env.TOKEN_SECRET)

        res.header('authorization-token', token)
        console.log(token)
        res.send("User Logged")
    }
}



module.exports = userController