const mongoose = require('mongoose');

const uri = `mongodb+srv://sandeep1:12345@cluster0.wvfu0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
    
//     // perform actions on the collection object
//     client.close();
// });

const db = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log(`connection successfull`)
}).catch(() => {
    console.log(`connection error`)
    db.close();
})

module.exports = db;