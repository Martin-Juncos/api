const server = require('./src/app')
const mongoose = require('./src/db/dataBase')

async function main() {
    try {
        await mongoose.connection
        console.log('Se realizo la conexion a MongoDB')
        server.listen(3000, console.log('Server run on port 3000'))
    } catch (error) {
        console.error('Problemas en la conexion ', error);        
    }    
}

main()