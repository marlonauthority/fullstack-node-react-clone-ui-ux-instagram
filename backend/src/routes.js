const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/upload");

const PostContoller = require("./controllers/PostController");
const LikeContoller = require("./controllers/LikeController");

const routes = new express.Router();
const upload = multer(multerConfig);

routes.get("/posts", PostContoller.index);
routes.post("/posts", upload.single("image"), PostContoller.store);
routes.post("/posts/:id/like", LikeContoller.store);

module.exports = routes;
