import express from "express";
import bodyparser from "body-parser";
import ejs from "ejs";

import qr from "qr-image";
import fs from "fs";
import path from "path";


const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/submit", (req, res) => {
    const URL = req.body["url"];
    var qr_svg = qr.image(URL);
    qr_svg.pipe(fs.createWriteStream("public/image/qr-image.png"));
    res.render("index.ejs", { url: URL });
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});