const mongoose = require('mongoose');

const dbConection = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_ATLAS_CON, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('DB is connected');
    } catch (error) {
        console.log(error);
        throw new Error("error al conectar con la base de datos");
    }
}

module.exports = {
    dbConection
};