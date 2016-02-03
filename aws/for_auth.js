//server.js
//Goes right before app.listen(80, function.....)
//aws educate
app.get('/api/v1/users/me', function(req, res) {
  //req.user is the currently authenticated user
  //passport sets req.user in the done function in ghStrategy
  res.json(req.user); //req.user is anything that passed in the done function in the ghStrategy.
});

//TODO
//EC2 Instance
//pem file chmod go-r (unfinishsed)
//sudo apt-get update
