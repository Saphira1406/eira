import nodemailer from 'nodemailer'

async function enviarNotificacionMail(email) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "eirainformacion@gmail.com", // generated ethereal user
          pass: "czmfsdekgazgnvln", // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
      });

      let info = await transporter.sendMail({
        from: 'No olvides tomar tu medicamento <eirainformacion@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Recordatorio", // Subject line
        //text: "Hello world?", // plain text body
        html: "<b>No olvides tomar tu medicamento IBUPROFENO 300mg a las 20.00hs</b>", // html body
      });

      return info
}

async function enviarToken(email, token) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "eirainformacion@gmail.com",
      pass: "czmfsdekgazgnvln",
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
      from: '"Eira" <eirainformacion@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Recuperar Contraseña", // Subject line
      html: `Este es tu link para recuperar la contraseña. Tené en cuenta que una vez que lo uses no podrás reutilizarlo. <br/>Hace <a href="http://localhost:3000/recuperarContrasena/${token}/${email}">click aquí</a> para cambiar la contraseña`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function contrasenaRecuperada(email) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "eirainformacion@gmail.com",
      pass: "czmfsdekgazgnvln",
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  let info = await transporter.sendMail({
      from: '"Eira" <eirainformacion@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: "Tu contraseña fue cambiada", // Subject line
      html: `Tu contraseña fue cambiada exitosamente.<br/> Si vos no hiciste el cambio contactanos a eirainformacion@gmail.com`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export {
    enviarNotificacionMail,
    enviarToken,
    contrasenaRecuperada
}