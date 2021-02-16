const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.BDURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Database Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error in Database Connection');
    }

}

module.exports = {
    dbConnection
}