const mongoose = require("mongoose");
var fs = require("fs");
const path = require("path");
const mongoURI =
  "mongodb+srv://shalinshah:shalinshah12@audiorecorder.hzoum.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//#region

// Mongo DB Connection Setup

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Open Connection Status
mongoose.connection.on("open", function (ref) {
  console.log("Connected to mongo server.");
  //trying to get collection names

  mongoose.connection.db.listCollections().toArray(function (err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
  });
});

mongoose.connection.on("error", (err) => {
    console.log(err);
  });

function createCommandFolders(User) {
  fs.readFile(path.join(__dirname, "commands.txt"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    var data_array = data.split("|");
    let upload_path = path.join(__dirname, "uploads", User);
    // console.log(data_array);
    console.log(upload_path)
    for (let i = 0; i < data_array.length; i++) {

      data_array[i] = data_array[i].replace(/(\r\n|\n|\r)/gm, "");
      fs.mkdir(path.join(upload_path, data_array[i]), function (err) {
        console.log("Creating folder ", data_array[i]);
      });
    }
  });
}

function userData() {
    const upload_path = path.join(__dirname, "uploads");
    const userMetaData = mongoose.connection.db.collection("AudioRecords.Users");
  
    userMetaData
      .find()
      .toArray()
      .then((docs) => {
        for (let i = 0; i < docs.length; i++) {
          var id = docs[i].uuid;
          console.log(docs[i].uuid);
          fs.mkdir(path.join(upload_path, id), function (err) {
            console.log("Creating folder for user : ", docs[i].uuid);
          });
          createCommandFolders(id);
        }
      });
}

const writeAll = mongoose.connection.on("open", function (ref) {
    const collection = mongoose.connection.db.collection("AudioRecords.files");
    const collectionChunks = mongoose.connection.db.collection(
      "AudioRecords.chunks"
    );
  
userData()
})