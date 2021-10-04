const mongoose = require("mongoose");
const serverConfig = require("../config");
// const Mockgoose = require("mockgoose").Mockgoose;
// const mockgoose = new Mockgoose(mongoose);

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};
const connectionUri = `mongodb+srv://${serverConfig.databaseUser}:${serverConfig.databasePass}@${serverConfig.databaseHost}/${serverConfig.databaseDb}?retryWrites=true&w=majority`;

function connect() {
    // if (process.env.NODE_ENV === "test") {
    //     mockgoose.prepareStorage().then(() => {
    //         mongoose
    //             .connect(connectionUri, connectionOptions)
    //             .then(() => console.log("Connection to database has been established"))
    //             .catch((error) =>
    //                 console.log("Connection could not be established", error)
    //             );
    //     });
    // } else {
    //     console.log(process.env.NODE_ENV);
    mongoose
        .connect(connectionUri, connectionOptions)
        .then(() => console.log("Connection to database has been established"))
        .catch((error) =>
            console.log("Connection could not be established", error)
        );
}
// }

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };