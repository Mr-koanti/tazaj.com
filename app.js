const express = require('express');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
// Set the public directory
app.use(express.static("public"));


app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/generate", async (req, res) => {
    const username = req.body.username;


    loadImage("./public/template.jpg").then((image) => {
        const canvas = createCanvas(image.width, image.height);
        const context = canvas.getContext('2d');

        // Draw the image on the canvas
        context.drawImage(image, 0, 0);

        // Set the font properties
        context.font = "45px Arial";
        context.fillStyle = "black";

        // Write the username on the canvas
        context.fillText(username, 500, 900);

        // Set the response headers
        const dataUrl = canvas.toDataURL('image/jpeg');

        // Send the data URL as the response
        res.render("show", {dataUrl});
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});