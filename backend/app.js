const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/rooms", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: "Post added successfully",
  });
});

app.get("/api/rooms", (req, res, next) => {
  const rooms = [
    {
      id: 1,
      name: "Room1",
      author: "Krzyś",
      imgSrc: "../../assets/img/avatar1.png",
      games: [
        {
          id: 1,
          name: "Kalambury",
          imgUrl:
            "https://files.rebel.pl/products/100/1437/_107584/gra-imprezowa-mdr-gierki-malzenskie-kalambury-pudelko-1200x900-ffffff.png",
        },
        {
          id: 2,
          name: "Szachy",
          imgUrl:
            "https://i.pinimg.com/736x/3c/4f/18/3c4f1886e5b1d47f3126703fd20f56b7.jpg",
        },
        {
          id: 3,
          name: "AmongUs",
          imgUrl:
            "https://android.com.pl/apps/wp-content/uploads/2020/09/amonguslogo.png",
        },
        {
          id: 4,
          name: "Kalambury1",
          imgUrl:
            "https://files.rebel.pl/products/100/1437/_107584/gra-imprezowa-mdr-gierki-malzenskie-kalambury-pudelko-1200x900-ffffff.png",
        },
        {
          id: 5,
          name: "Szachy1",
          imgUrl:
            "https://i.pinimg.com/736x/3c/4f/18/3c4f1886e5b1d47f3126703fd20f56b7.jpg",
        },
        {
          id: 6,
          name: "AmongUs1",
          imgUrl:
            "https://android.com.pl/apps/wp-content/uploads/2020/09/amonguslogo.png",
        },
      ],
      players: ["Krzyś"],
    },
    {
      id: 2,
      name: "Room2",
      author: "Piter",
      imgSrc: "../../assets/img/avatar11.png",
      games: [],
      players: [],
    },
    {
      id: 3,
      name: "Room3",
      author: "Pyć",
      imgSrc: "../../assets/img/avatar13.png",
      games: [],
      players: [],
    },
  ];
  res.status(200).json({
    message: "testowe posty",
    rooms: rooms,
  });
});

module.exports = app;
