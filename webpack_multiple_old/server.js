var http = require('http');
var express = require('express');
var app = express();

(function() {

  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));

})();

////////////////////////////////
///////// ROUTES HERE //////////
////////////////////////////////

app.get('/', function(req, res){
    res.sendFile(__dirname + '/subapps/sim/index.html');
});

app.get('/ui', function(req, res){
    res.sendFile(__dirname + '/subapps/ui/index.html');
});

app.get('/story', function(req, res){
    res.sendFile(__dirname + '/subapps/story/index.html');
});


if (require.main === module) {
  var server = http.createServer(app);

  server.listen(process.env.PORT || 8081, function() {
    console.log("Listening on %j", server.address());
  });


  var io = require('socket.io')(server);

  io.on('connection', (socket) => {
		console.log('connect ' + socket.id);

		socket.on('echo', function (data) {
			// we tell the client to execute 'new message'
			console.log("oh we got data!");
			console.log(data);
			console.log("sending back data!");
			socket.emit('message', data);
		});

		socket.on('broadcast', function (data) {
			// we tell the client to execute 'new message'
			console.log("oh we got data!");
			console.log(data);
			console.log("broadcasting data!");
			socket.broadcast.emit('message', data);
		});


		socket.on('disconnect', () => console.log('disconnect ' + socket.id));

  });

}


///////// express server a


