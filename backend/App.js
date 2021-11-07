const express = require("express");
var config = require("./config/default.json");
const fs = require("fs");
const path = require("path");
//var cors = require("cors");
var multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
var mongoose = require("mongoose");

var env = config["development"];
var mongoURL = env.mongoURI;

//start app
const app = express();

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//app.use(cors());

const connection = mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let storage = new GridFsStorage({
  db: connection,
  file: (req, file) => {
    let command = req.get("command_name");
    let userId = req.get("userId");
    let filename = command + "|" + userId;
    return {
      bucketName: "AudioRecords",
      filename: filename,
      //Setting collection name, default name is fs
    };
  },
});

const upload = multer({ storage });

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.send("Working fine");
});

app.get("/read-file", (req, res) => {
  fs.readFile(
    path.join(__dirname, "/dataset/commands.txt"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      var data_array = data.split(env.Delimiter);
      res.send(JSON.stringify(data_array));
    }
  );
});

const PORT = process.env.PORT || env.port;

app.post("/receive-audio", upload.single("audio_data"), (req, res) => {
  //console.log(req);
  return res
    .status(200)
    .send({ message: "Received blob successfully and Uploaded" });
});

//#region  API used to store User Data.

app.post("/receive-userData", (req, res) => {
  console.log(req.body);
  // upload to MongoDB
  //console.log(connection);
  mongoose.connection.db
    .collection("AudioRecords.Users")
    .insertOne(req.body, function (err, result) {
      if (err) {
        res.send("Error");
      }
      res.send("Success");
    });
});

//#endregion

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});
