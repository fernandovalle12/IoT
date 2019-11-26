var express = require('express');
var router = express.Router();
var switchesService = require('../services/switchService');
var sensoresService = require('../services/sersorService');

/* GET home page. */
router.get('/', function(req, res, next) {
  var switches = switchesService.getSwitches();
  var sensores = sensoresService.getSensores();

  res.render('index', { title: 'Switches', switches: switches, sensores});
});

// router.get('/posts/:postId', function(req, res, next) {
//   var postId = req.params.postId;

//   var posts = postsService.getPosts();

//   var post = posts.filter((post) => post.id == postId)[0];

//   res.render('post', { title: post.title, post: post });

// });

module.exports = router;
