const mongoose = require('mongoose');

// mongodb+srv://nicolaspoteljunot:<password>@calendardb.g9j661f.mongodb.net/test
// db user: nicolaspoteljunot
//pass: 38987390++


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log("DB ONLINE")

    } catch (error) {
        console.log(error)
        throw new Error("error de base de datos")
    }
}

module.exports= {
    dbConnection
}


