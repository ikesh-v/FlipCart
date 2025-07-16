//importing modules
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { MongoClient, ServerApiVersion } = require('mongodb');

const mongoUserName = env.MONGO_USER_NAME || "ikesh";
const mongoPassword = env.MONGO_PASSWORD || "vXBr2sUOt7Ulr52s"
const mongoClusterName = env.MONGO_CLUSTER || "cluster0.cxqbuqz.mongodb.net";

const uri = `mongodb+srv://${mongoUserName}:${mongoPassword}@${mongoClusterName}/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

let app = express();


//importing routes
const users_route = require("./routes/users.route");
const products_route = require("./routes/products.route");
const orders_route = require("./routes/orders.route");
const reviews_route = require("./routes/reviews.route");
const passwords_route = require("./routes/unused-routes/passwords.route");


//adding middleware-cors
app.use(cors({}));

//adding middware-body-parse
app.use(bodyparser.json());

//static files
//fetch static files from this location
app.use(express.static(path.join(__dirname, "./../frontend/dist/flipcart-frontend/")));

app.get("/api", (req,res) => {
    res.sendFile(path.join(__dirname,"/static/api-documentation.html"));
});


//port number
const port = process.env.PORT || 3000 ;

//use the sepcified route
app.use("/api/users",users_route);
app.use("/api/products",products_route);
app.use("/api/orders",orders_route);
app.use("/api/reviews",reviews_route);
//app.use("/api/passwords",passwords_route);


//load the angular app 
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, "./../frontend/dist/flipcart-frontend/")); } );


app.listen(port, () => {
    console.log("Server started at port: "+port)
})
