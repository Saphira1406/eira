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

export {
    enviarNotificacionMail
}