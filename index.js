const express = require('express')
const app = express()
const port = 3000
const mensagens =[
  "essa é a primeira mensagem",
  "essa é a segunda mensagem"
];

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/mensagens', (req, res) =>{
  res.send(mensagens);
});

app.get('/mensagens/:id', (req, res) =>{

  const id = req.params.id;
  const mensagem = mensagens[id];
  
  res.send(mensagem);
});

app.listen(port, function(){
  console.log(`app rodando em http://localhost:${port}`)
})