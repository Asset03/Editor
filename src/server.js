const express = require("express");
const fs = require("fs");
const path = require("path");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const folderPath = path.join(__dirname, "translates");
app.get("/read-file", (req, res) => {
  fs.readdir(folderPath, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading files");
      return;
    }
    const files = {};
    data.forEach((file) => {
      const filePath = `${folderPath}/${file}`;
      const content = fs.readFileSync(filePath, "utf8");
      const language = file.split(".")[0];
      if (language != "") {
        files[language] = JSON.parse(content);
      }
    });

    res.json(files);
  });
});

app.post("/write-file", (req, res) => {
  const param = req.query.param;
  const filePath = `${folderPath}/${param}.json`;
  const data = JSON.stringify(req.body.data, null, 2);
  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("changed", filePath);
    }
  });
});

app.listen(3000, () => {
  console.log("started on port 3000...");
});
