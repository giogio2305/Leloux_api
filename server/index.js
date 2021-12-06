// server/index.js

const express = require("express");


const PORT = process.env.PORT || 5000;

const app = express();

var bodyParser = require('body-parser');
const path = require('path');
const {generateOTP, mailOTP, verifyMailTOP, fast2sms} = require('../utils/otp.utils')
 
global.__basedir = __dirname;
 

const db = require('./db.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');


app.use(express.json());

//app.use(bodyParser.json());

const Vehicules = db.Vehicules;
const Reparateurs = db.Reparateurs;
const Interventions = db.Interventions;
const Workers = db.Workers;
const Clients = db.Clients;
const Diagno = db.Diagno;

let router = require('./router.js');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:19006', 'http://localhost:19000'],
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions));



app.use(session({
  key: "id",
  secret: "leloux",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
  },
})
);



app.use(express.static('resources'));

// Have Node serve the files for our built React app
/*app.use(express.static(path.resolve(__dirname, '../client/build')));*/

app.use('/', router);
// All other GET requests not handled before will return our React app
/*app.get('*', (req, res) => {
 res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});*/





// ---Login reparateurs--->
app.post('/login', async (req, res)=>{
  const repa = req.body.repa; 
   const code= req.body.code;
  const reparteur = await Reparateurs.findOne({ where: { repa: repa } });
  if (!reparteur) {console.log("wrong user"); return res.status(400).json("Reparateur non existant");}

  const dbcode = reparteur.code;
  bcrypt.compare(code, dbcode).then((match)=>{
      if(!match){
      console.log("wrong pass");
        return res
        .status(400)
        .json("Code invalide");

      }else{
        session.repa = reparteur;
        const id = session.repa.id;
        const token = jwt.sign({id}, "fixas", {
          expiresIn: 300,
        });
        return res.send({auth: true, token: token, result: reparteur, role: 'REPA'});
      }
  });
  
});
//----end login rep---->
// ---Login employes--->
app.post('/logine', async (req, res)=>{
  const emp = req.body.emp;
  const mail = req.body.mail 
   const code= req.body.code;
  const workers = await Workers.findOne({ where: { pseudo: emp } });
  if (!workers) {console.log("wrong user"); return res.status(400).json({ error: "Employé non existant"});}

  const dbcode = workers.code;
  bcrypt.compare(code, dbcode).then((match)=>{
      if(!match){
      console.log("wrong pass");
        return res
        .status(400)
        .json({error: "Code invalide"});

      }else{
        session.emp = workers;
        const id = session.emp.id;
        const token = jwt.sign({id}, "workers", {
          expiresIn: 300,
        });
        return res.send({auth: true, token: token, result: workers, role: 'EMP'});
      }
  });
  
});
//----end login emp---->

  




app.post('/register',(req, res) => {
  const { nom, mail, tel, adr, pass, } = req.body;
  const idv =nom;
  bcrypt.hash(pass, 10).then((hash) => {
    Clients.create({
      nom: nom,
      mail: mail,
      tel: tel,
      adr: adr,
      pass: hash,
    })
      .then(async () => {
        const client = await Clients.findOne({ where: { nom: idv } });
        session.client = client;
        const id = session.client.id;
        const token = jwt.sign({ id }, "tofix", {
          expiresIn: 300,
        });
        return res.json({
          status: "SUCCESS",
          message: "Bienvenue sur LeLoux",
          data: client,
          auth: true,
          token: token,
          role: 'CLIE',
        });
        /*return res.json({
          status: 'SUCCESS',
          message: "Client enregistre"
        });*/

      })
      .catch((err) => {
        if (err) {
          return res.status(400).json({ error: err });

        }
      });
  })
});




app.post('/cclient', async (req, res) => {
  const nom = req.body.nom;
  const pass = req.body.pass;
  const client = await Clients.findOne({ where: { nom: nom } });
  if (!client) {
    console.log("wrong user"); 
    return res.json({
      status: "FAILED",
      message: "Nom d'utilisateur inexistant",
    }); }

  const dbcode = client.pass;
  bcrypt.compare(pass, dbcode).then((match) => {
    if (!match) {
      console.log("wrong pass");
      return res.json({
        status: "FAILED",
        message: "Mot de passe incorrect!",
      });

    } else {
      session.client = client;
      const id = session.client.id;
      const token = jwt.sign({ id }, "tofix", {
        expiresIn: 300,
      });
      return res.json({
        status: "SUCCESS",
        message: "Connexion reussie",
        data: client,
        auth: true,
        token: token,
        role: 'CLIE',
      });
    }
  });

});
//----end login client---->
app.put('/checkumail', async (req, res)=>{
const mail= req.body.mail;
const id = req.body.id;
const client = await Clients.findByPk(id);
if (!client) {
  console.log("wrong user"); 
  return res.json({
    status: "FAILED",
    message: "Utilisateur inexistant",
  }); 
}
else{
  const OTP = generateOTP(6);
  client.mailOtp = OTP;
 client.save({ fields: ['mailOtp'] })
    let smail = mailOTP(mail, OTP);
    console.log(smail)
    if (smail === true ){
      res.json({
        status: 'SUCCESS',
        message: 'Code envoyé'
      }
      )
    }

}
})

app.put('/changeumail', async (req, res)=>{
const mail= req.body.mail;
const id = req.body.id;
const otp = req.body.mailOtp;
const client = await Clients.findByPk(id);
if (client.mailOtp !== otp) {
  console.log("wrong otp"); 
  return res.json({
    status: "FAILED",
    message: "Utilisateur inexistant",
  }); 
}
else{
  let updatedObject = {mail: mail, mailOtp: ''}
  let result= await Clients.update(updatedObject, {
    returnig: true,
    where: {id: id},
    attributes: ['mail','mailOtp']
  })
  if (!result){
    res.status(500).json({
      message: "Error -> Can not update a customer with id = " + id,
      error: "Can NOT Updated",
  });
  }else{
    const upclient = await Clients.findByPk(id);
    return res.json({
      status: "SUCCESS",
      message: "Votre adresse mail a bien été mise à jour",
      data: upclient,
  });
  }

}})

app.put('/checkutel', async (req, res)=>{
  const tel= req.body.tel;
  const id = req.body.id;
  const client = await Clients.findByPk(id);
  if (!client) {
    console.log("wrong user"); 
    return res.json({
      status: "FAILED",
      message: "Utilisateur inexistant",
    }); 
  }
  else{
    const OTP = generateOTP(6);
    client.phoneOtp = OTP;
   client.save({ fields: ['phoneOtp'] })
    fast2sms(tel, OTP, (tel)=>{
      if (tel === true ){
        res.json({
          status: 'SUCCESS',
          message: 'Code envoyé'
        }
        )
      }
      console.log(tel)
      }
    )      

  
  }
  })
app.put('/changeutel', async (req, res)=>{
  const tel= req.body.tel;
  const id = req.body.id;
  const phoneOtp= req.body.phoneOtp
  const client = await Clients.findOne({ where: { id: id } });
  if (!client.phoneOtp !==phoneOtp) {
    console.log("wrong otp"); 
    return res.json({
      status: "FAILED",
      message: "Utilisateur inexistant",
    }); 
  }
  else{
    let updatedObject = {tel: tel, phoneOtp: ''}
    let result= await Clients.update(updatedObject, {
      returnig: true,
      where: {id: id},
      attributes: ['tel', 'phoneOtp']
    })
    if (!result){
      res.status(500).json({
        message: "Error -> Can not update a customer with id = " + id,
        error: "Can NOT Updated",
    });
    }else{
      const upclient = await Clients.findByPk(id);
      return res.json({
        status: "SUCCESS",
        message: "Votre numéro de téléphone a bien été mise à jour",
        data: upclient,
    });
    }
  }
  })













db.sequelize.sync().then(()=>{
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    //bcrypt.hash("123456789", 10).then((hash)=>{console.log(hash)});
  })
});
