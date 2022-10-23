const express = require("express");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { PORT } = require("../const.js");
const app = express();

app.get("/downloadUrl", (req, res) => {
  const { url } = req.query;
  const fileName = String(url)
    .replace(/https:\/\/(\w*.)+\//gm, "")
    .split(" ")
    .join("");
  const _path = /\.(\w+)$/gm.exec(String(fileName));
  const relativePath = _path?.length > 0 && path.join(__dirname, `${_path[1]}`);
  console.log(fs.existsSync(relativePath));
  if (!fs.existsSync(relativePath)) {
    fs.mkdirSync(relativePath);
  }
  console.log(fs.existsSync(relativePath));
  if (url && fileName.length && relativePath) {
    const time = `${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}-${new Date().getHours()}-${new Date().getMinutes()}`;
    const fileNNNAme = `${relativePath}/${time}-${String(fileName)}`;
    const file = fs.createWriteStream(fileNNNAme);

    https.get(url, function (response) {
      response.pipe(file);

      file
        .on("finish", () => {
          file.close();
        })
        .on("error", function (err) {
          fs.unlink(fileNNNAme);
          fs.createWriteStream(fileNNNAme).write(err);
        });
    });

    res.status(200).send("ok");
  } else {
    res.status(400).send("debil?");
  }
});

app.listen(PORT, () => {
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~`);
  console.log(`-------------------------`);
  console.log(
    "\x1b[32m\x1b[2m",

    `SERVER STARTED AT ${PORT}`
  );
  console.log(`-------------------------`);
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~`);
});
