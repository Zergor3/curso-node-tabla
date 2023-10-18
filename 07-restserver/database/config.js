const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log(process.env.MONGODB_CNN);
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log('Base de datos online');
    } catch (e) {
        console.log(e);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}