const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
var cors = require('cors')
require('dotenv').config()

const port = process.env.PROT || 5000



app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u675lb8.mongodb.net/?retryWrites=true&w=majority`;

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

    await client.connect();
    const usersCollection = client.db("My_users").collection("shipon");

  app.get('/users', async(req, res)=>{
    const query = usersCollection.find()
    const result = await query.toArray()
    res.send(result)
    
})

    app.post('/users', async(req, res)=>{
      user = req.body;
      const result = await usersCollection.insertOne(user);
      console.log(result)
      res.send(result)
    })


    app.get('/users/:id', async(req, res)=>{
      const id = req.params.id
      const query = {_id:  new ObjectId(id)};
      const user = await usersCollection.findOne(query)
      res.send(user)
   })

   app.put('/users/:id', async(req, res)=>{
    const id = req.params.id;
    const updateUser = req.body;
    console.log(id,updateUser)
  })

    app.delete('/users/:id', async(req, res)=>{
        const id = req.params.id
        const query = {_id:  new ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res.send(result)
        console.log('user delete',id)
    })

   // find a document 

   
 
  } finally {
    
   // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('<h2 style="color:cyan; text-align:center; margin:20% auto;">database server running</h2>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})