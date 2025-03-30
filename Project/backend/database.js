var mongoose = require("mongoose")

mongoose
  .connect("mongodb+srv://arun:arun@cluster0.hk0ol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => { console.log("Db connected") })
  .catch(() => { console.log(err) });
