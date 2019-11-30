const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 5,
        sort: "-createdAt"
      }
    );

    // const posts = await Post.find().sort("-createdAt");
    setTimeout(function() {
      return res.json(posts);
    }, 1000);
  },

  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    //remove a extesao
    const [name, ext] = image.split(".");
    // insere a extensao
    const fileName = `${name}.jpg`;
    const small = `small${name}.jpg`;

    // converte a imagem para um tamanho menor
    const imageconverted = await sharp(req.file.path)
      .resize(500)
      .jpeg()
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    const newimageconverted = await sharp(req.file.path)
      .resize(50)
      .jpeg()
      .toFile(path.resolve(req.file.destination, "resized", small));

    //console.log(newimageconverted);

    const aspectRatio = imageconverted.width / imageconverted.height;

    // apaga a imagem original
    fs.unlinkSync(req.file.path);

    // cria o post
    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
      imagesmall: small,
      aspectratio: aspectRatio
    });

    req.io.emit("post", post);

    return res.json(post);
  }
};
