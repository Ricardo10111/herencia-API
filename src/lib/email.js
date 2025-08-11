const nodemailer = require('nodemailer')
const path = require('path')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const sendEmail = async (data) => {
  const htmlContent = `
    <div style="font-family: 'Arial', sans-serif; background-color: #E9E1D9; padding: 30px;">
      <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #ddd;">

        <div style="background-color: #C5A95E; padding: 20px; text-align: center;">
          <img src="cid:herencia-logo" alt="Herencia Logo" style="height: 60px;" />
        </div>

        <div style="padding: 30px;">
          <h2 style="color: #4A3F2C;">Nuevo mensaje desde Herencia</h2>
          <p style="font-size: 16px; color: #4A3F2C;">
            Has recibido un nuevo mensaje desde el formulario de contacto en tu sitio web.
          </p>

          <div style="margin-top: 20px; background: #F9F6F2; padding: 20px; border-left: 4px solid #C5A95E;">
            <p><strong>Nombre:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Teléfono:</strong> ${data.phone}</p>
            <p><strong>Mensaje:</strong><br>${data.textArea.replace(/\n/g, '<br>')}</p>

            ${
              data.image?.data && data.image?.contentType
                ? `
                <div style="margin-top: 20px; text-align: center;">
                  <p style="margin-bottom: 10px;"><strong>Imagen enviada:</strong></p>
                  <img src="cid:user-image" alt="Imagen enviada" style="max-width: 100%; border-radius: 8px; border: 1px solid #ccc;" />
                </div>
              `
                : ''
            }
          </div>

          <p style="font-size: 13px; color: #999; margin-top: 30px;">Este correo fue generado automáticamente. No respondas directamente.</p>
        </div>
      </div>
    </div>
  `

  const attachments = [
    {
      filename: 'logo.svg',
      path: path.join(__dirname, '../../public/logo-herencia.svg'),
      cid: 'herencia-logo'
    }
  ]

  // Adjuntar imagen del formulario si existe
  if (data.image?.data && data.image?.contentType) {
    attachments.push({
      filename: 'imagen.jpg',
      content: data.image.data,
      contentType: data.image.contentType,
      cid: 'user-image'
    })
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Nuevo mensaje desde Herencia',
    text: `Nombre: ${data.name}\nCorreo: ${data.email}\nTeléfono: ${data.phone}\nMensaje:\n${data.textArea}`,
    html: htmlContent,
    attachments
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Correo enviado con éxito')
  } catch (error) {
    console.error('Error al enviar el correo:', error)
  }
}

module.exports = sendEmail
