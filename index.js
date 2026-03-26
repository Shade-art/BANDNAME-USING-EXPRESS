import express from "express"
import {dirname} from "path"
import {fileURLToPath} from "url"
import bodyParser from "body-parser"
const __dirname = dirname(fileURLToPath(import.meta.url))

const app =express()
const port = 3000;

app.use(express.urlencoded({extended:true})) //to use .body for req


//middleware
const combiner =(req,res,next)=>{
    req.bandname=req.body.bandname+req.body.stname
    next()
}



//homepage
app.get("/",(req,res)=>{ 
    res.sendFile(__dirname+"/PUBLIC/index.html")
})

//posting data into form
app.post("/submit",combiner,(req,res)=>{ //correct way to add middleware
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Your Band Name</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #ff7e5f, #feb47b);
    }

    .card {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      text-align: center;
      width: 350px;
    }

    h1 {
      color: #333;
      margin-bottom: 20px;
    }

    h2 {
      color: #ff7e5f;
      font-size: 28px;
      margin-bottom: 30px;
    }

    a {
      text-decoration: none;
      background: #ff7e5f;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      transition: 0.3s;
    }

    a:hover {
      background: #e86a50;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>🎸 BAND NAME IS</h1>
    <h2>${req.bandname}</h2>
    <a href="/">Try Again</a>
  </div>
</body>
</html>
`);
    
})

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})