const express = require('express');
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get('/api/health',(req,res) =>{
    res.send("App is running health is okay")
});

app.listen(3000);

module.exports = app;