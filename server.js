let express = require("express");
let app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://uzairrzafar1:Deakin3@cluster0.miausil.mongodb.net/?retryWrites=true&w=majority";

let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + "/"));


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function runDB() {
  try {
    await client.connect();
    collection = client.db().collection("Cat");
    console.log(collection);
  } catch (ex) {
    console.error(ex);
  }
}

app.get("/", (req, res) => {
  res.render("index.html");
});


app.get('/api/cats', (req,res) => {
    getAllCats((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'Get cats successfully'});
        }
    });
});
app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'Successfull'});
        }
    });
});

function postCat(cat,callback) {
    collection.insertOne(cat,callback);
}



function getAllCats(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, () => {
  console.log("Welcome to server SIT725 on port: " + port + " :)");
  runDB();
});
