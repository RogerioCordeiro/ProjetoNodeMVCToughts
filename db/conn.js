const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('tougths', 'root', '', {
    host: 'locahost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('conectado com sucesso')
} catch (err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize