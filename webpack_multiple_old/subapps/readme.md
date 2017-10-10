To add a new subapp:

1) make a new directory in here, etc. 

2) edit `webpack.config.js` and add an entry key/value pair:

```
entry: {
		sim_bundle: ['./subapps/sim/main.js', hotMiddlewareScript],
		ui_bundle: ['./subapps/ui/main.js', hotMiddlewareScript],
    foo_bundle: ['./subapps/foo/main.js', hotMiddlewareScript]
	},
```
the file will be accessible as `/foo_bundle.js`.

3) edit `server.js` and add a new route:

```
app.get('/foo', function(req, res){
    res.sendFile(__dirname + '/subapps/foo/index.html');
});
```




