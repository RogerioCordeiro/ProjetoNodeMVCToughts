const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res) {
        res.render('auth/login')
    }
    static register(req, res) {
        res.render('auth/register')
    }
    static async registerPost(req, res) {
        const { name, email, password, confirmPassword } = req.body
        if (password != confirmPassword) {
            req.flash('message', 'As senhas não conferem, tente novamente')
            return res.render('auth/register')
        }
        const checkIfEmailExists = await User.findOne({ where: { email: email } })
        if (checkIfEmailExists) {
            req.flash('message', 'Email já está cadastrado, tente novamente!')
            return res.render('auth/register')
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user = {
            name,
            email,
            password: hashedPassword
        }
        try {
            await User.create(user)
            req.session.userI = user.id
            req.flash('message', 'Cadastro realizado com sucesso!')
            return res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    }
}