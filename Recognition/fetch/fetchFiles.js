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

//#endregion

//#region Utilities

// Command Folder Creation

function createCommandFolders(User) {
  fs.readFile(path.join(__dirname, "commands.txt"), "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    var data_array = data.split("|");
    let upload_path = path.join(__dirname, "uploads", User);
    console.log(data_array);
    for (let i = 0; i < data_array.length; i++) {
      data_array[i] = data_array[i].replace(/(\r\n|\n|\r)/gm, "");
      fs.mkdir(path.join(upload_path, data_array[i]), function (err) {
        console.log("Creating folder ", data_array[i]);
      });
    }
  });
}

// User Creation Function

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

//#endregion Utilities

// Storing chunks of data in folders

const writeAll = mongoose.connection.on("open", function (ref) {
  const collection = mongoose.connection.db.collection("AudioRecords.files");
  const collectionChunks = mongoose.connection.db.collection(
    "AudioRecords.chunks"
  );

  userData();
  // finding in collection to get all docs.
  collection
    .find()
    .toArray()
    .then((docs) => {
      // after obtaining docs, iterating over docs to obtain chunks
      for (let i = 0; i < docs.length; i++) {
        // finding chunks and sorting them based on n.
        collectionChunks
          .find({ files_id: docs[i]._id })
          .sort({ n: 1 })
          .toArray()
          .then((chunks) => {
            // Storing chunks in fileData array
            let fileData = [];
            for (let j = 0; j < chunks.length; j++) {
              fileData.push(chunks[j].data.toString("base64"));
            }
            // Since data was stored in BSON format, we decode the base64 encoding.
            var buf = Buffer.from(fileData.join(""), "base64");
            // fileName for storage.
            var dateString = docs[i].uploadDate
              .toISOString()
              .replace(/T/, " ")
              .replace(/\..+/, "")
              .replace(/:/g, "-")
              .replace(/ /g, "_");

            var metaData = docs[i].filename.split("|");

            metaData[1] = metaData[1].replace(/\./g, "_");

            var fileName = path.join(
              __dirname,
              "/uploads/",
              metaData[1],
              metaData[0],
              dateString + ".wav"
            );
            let writeStream = fs.createWriteStream(fileName);
            writeStream.write(buf);
            // End of writeStream.
            writeStream.end();
            console.log(" Finished writing : ", fileName);
          });
      }
    })
    .catch((err) => {
      console.log("Error");
    });
});
//exit()

console.log("Completed");
