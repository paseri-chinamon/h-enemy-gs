var express = require('express');
var router = express.Router();
var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);

/* GET home page. */
router.get('/', async function (req, res, next) {

  getgame = await(() => {
    new Promise(() => {
      var num = 0;
      var list = {};
      client.get(token, function (err, reply) {
        list[num++] = JSON.parse(reply);
        console.log(reply);
        return list
      });
    })
  });
  var params = {'response' : 200, 'value' : getgame}
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.send(params);
});

module.exports = router;