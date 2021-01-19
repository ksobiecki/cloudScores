const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/rooms", (req,res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/rooms',(req, res, next)=>{

  const rooms=[
    {
      id: 'room1',
      name: 'room1',
      author: 'room1',
      games:[
        {
          id: 'sth',
          name: 'sth',
          imgUrl: 'sth'
        },
        {
          id: 'sth2',
          name: 'sth2',
          imgUrl: 'sth2'
        }
    ]
    }
  ]
  res.status(200).json({
    message: 'testowe posty',
    rooms:rooms,
  });
});

module.exports = app;
