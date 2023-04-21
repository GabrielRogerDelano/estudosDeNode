const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const port = 3000

app.use(bodyParser.json()); 

const mensagens =[
  {
    "id": 1,
    "testo": "essa é a primeira mensagem", 
  },
  {
    "id": 2,
    "testo": "essa é a segunda mensagem", 
  }
];

const getMensagensValidas = () => mensagens.filter(Boolean)

const getMensagensById = id => getMensagensValidas().find(msg => msg.id === id)

app.get('/', function (req, res) {
  res.send('Hello World');
});


// [GET] /mensagens - retorna a lista de mensagens
app.get('/mensagens', (req, res) =>{
  res.send(getMensagensValidas());
});


// [GET] /mensagens/{id} - retorna aapenas uman mensagem pelo id
app.get('/mensagens/encontra/:id', (req, res) =>{
  const id = +req.params.id - 1;
  
  const mensagem = getMensagemByID(id);

  if(!mensagem){
    res.send("mensagem não encontrada")
    return
  }
  
  res.send(mensagem);
});


// [POST] /mensagens - criar uma mensagem
app.post('/mensagens/criar', (req,res)=>{
  const mensagem = req.body

  if(!mensagem || !mensagem.texto){
    res.send('mensagem inválida')
    return;
  }
  mensagem.id = mensagens.length + 1
  mensagens.push (mensagem)

  res.send(mensagem)
});


// [PUT] /mensagens/{id} - Atualiza as mensagens pelo id
app.put('/mensagem/atualiza/:id', (req, res) =>{
  const id = +req.params.id - 1;
  
  const mensagem = getMensagemByID(id);

  const novoTexto = req.body.texto;
  if(!novoTexto){
    res.send('Mensagem inválida')
  }
  mensagem.texto = novoTexto;

  res.send(mensagem)
});


// [DELETE] /mensagem/{id} - Remove uma mensagem pelo id
app.put('/mensagem/delete/:id', (req, res) =>{
  const id = +req.params.id - 1;
  
  const mensagem = getMensagemByID(id);

  if(!mensagem){
    res.send('Mensagem não encontrada')

    return
  }

  const index = mensagem.indexOf(mensagem)
  delete mensagens[index];

  res.send(`mensagem apagada com sucesso`)
});


app.listen(port, function(){
  console.log(`app rodando em http://localhost:${port}`)
})