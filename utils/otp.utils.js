//const fast2sms = require("fast-two-sms");
//const {FAST2SMS} = require("../config");
const nodemailer = require('nodemailer');
const db = require('../server/db');

const Clients = db.Clients;
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "5fcc0a18",
  apiSecret: "hWh31XKhUgJsuAAe"
})

exports.generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.fast2sms = async (number, otp, cb) => {
    const from = "Leloux"
    const to = number
    const text = 'Votre code de confimartion est ' + otp;
    let vd = true
    
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            vd = false
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0")
             {
                console.log("Message sent successfully.");
            } else {
                vd= false
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
        cb(vd);
    })
};

exports.mailOTP = (mail, otp) => {
    let sq = true
    let transporter = nodemailer.createTransport
    ({service: 'gmail', 
    auth: {user: 'dasilvagueye@gmail.com', pass:'Geogeo2020'}
});
var mailOptions = {to:mail, subject: "Code de vérification d'adresse mail", html: "<h3>Votre code de Confirmation est : </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" }
transporter.sendMail(mailOptions,(error, info)=>{
if(error){ sq=false;  return console.log(error)} 
console.log('Message envoyé : %s', info.message);
console.log('Prévisualiser ici : %s', nodemailer.getTestMessageUrl(info));
})
return  sq;
}

exports.verifyMailTOP = async (id, otp) =>{
let client = await Clients.findByPK(id);
if(!client){
    return {
        type: 'failed',
        message: 'Utilisateur non trouvée'
    }
}
else{
    if(client.mailOTP !== otp){
        return type ='failed';
    }
    else {
        return type ='success';
    }
}
}