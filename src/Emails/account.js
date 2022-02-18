const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email,name)=>{
    sgMail.send({
        to: email,
            from: 'eng.ahmadsh28@gmail.com', 
            subject:'Thanks for joining in!',
            text:`${name}, welcome to the app, Let me know how you find the App?`,
            // html:
    })
}

const sendCancelingEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'eng.ahmadsh28@gmail.com', 
        subject:'Sorry to see you go',
        text:`Dear ${name} san, we are sorry to see you walking away, is there anything we can improve? `
    })
}
module.exports = {
    sendWelcomeEmail,
    sendCancelingEmail
}





// const msg = {
//     to: 'eng.ahmadsh28@gmail.com', // Change to your recipient
//     from: 'eng.ahmadsh28@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     })