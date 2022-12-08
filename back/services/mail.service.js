import nodemailer from 'nodemailer'

async function enviarNotificacionMail(email) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "eirainformacion@gmail.com",
          pass: "czmfsdekgazgnvln",
        },
        tls: {
            rejectUnauthorized: false
        }
      });

      let info = await transporter.sendMail({
        from: 'No olvides tomar tu medicamento <eirainformacion@gmail.com>',
        to: email,
        subject: "Recordatorio",
        html: "<b>No olvides tomar tu medicamento IBUPROFENO 300mg a las 20.00hs</b>",
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
      from: '"Eira" <eirainformacion@gmail.com>',
      to: `${email}`,
      subject: "Recuperar Contraseña",
      html: `Este es tu link para recuperar la contraseña. Tené en cuenta que una vez que lo uses no podrás reutilizarlo. <br/>Hace <a href="http://localhost:3000/recuperarContrasena/${token}/${email}">click aquí</a> para cambiar la contraseña`,
  });

  console.log("Message sent: %s", info.messageId);
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
      from: '"Eira" <eirainformacion@gmail.com>',
      to: `${email}`,
      subject: "Tu contraseña fue cambiada",
      html: `Tu contraseña fue cambiada exitosamente.<br/> Si vos no hiciste el cambio contactanos a eirainformacion@gmail.com`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function avisoValidarMatricula(medico) {
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
      from: '"Eira" <eirainformacion@gmail.com>',
      to: 'eirainformacion@gmail.com',
      subject: "Se registró un nuevo médico - Validar matrícula",
      html: `Se registró el médico <b>${medico.nombre} ${medico.apellido}</b> con número de matrícula: <b>${medico.matricula}</b>.<br>Validar matrícula para que el médico pueda hacer uso de la app.`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

async function avisoMedicoVerificacion(medico) {
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

  let asunto = null;
  let texto = null;

  if(medico.verificado) {
    asunto = "Tu matrícula fue verificada"
    texto = `Hola ${medico.nombre} ${medico.apellido}, ya verificamos tu matrícula, y te dimos acceso a las funcionalidades de profesionales de salud.`
  } else {
    asunto = "Hubo un problema con la verificación de tu matrícula"
    texto = `Hola ${medico.nombre} ${medico.apellido}, tuvimos problemas para poder verificar tu matrícula. Por favor, ponete en contacto en nosotros para poder resolver el problema lo antes posbile.<br>
    Escirbinos un mail con el asunto "No se verificó mi matrícula" a <a href="mailto:eirainformacion@gmail.com" target="_blank">eirainformacion@gmail.com</a>`
  }

  let info = await transporter.sendMail({
      from: '"Eira" <eirainformacion@gmail.com>',
      to: medico.email,
      subject: asunto,
      html: texto,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export {
    enviarNotificacionMail,
    enviarToken,
    contrasenaRecuperada,
    avisoValidarMatricula,
    avisoMedicoVerificacion
}