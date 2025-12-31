import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import { Resend } from 'resend'

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Non ou dwe omwen 2 lèt'),
  email: z.string().email('Adrès imel ou pa kòrèk'),
  subject: z.string().min(5, 'Sijè a dwe omwen 5 mo'),
  message: z.string().min(10, 'Mesaj ou dwe omwen 10 mo'),
})

// TanStack Start server function for sending contact emails
export const sendContactEmail = createServerFn()
  .inputValidator(contactSchema)
  .handler(async (ctx) => {
    try {
      // Extract and validate the input data
      const data = contactSchema.parse(ctx.data)

      // Check if Resend API key is configured
      const resendApiKey = process.env.RESEND_API_KEY
      if (!resendApiKey) {
        console.warn('RESEND_API_KEY not configured')

        throw new Error('Sèvis imel la pa konfigire')
      }

      // Initialize Resend
      const resend = new Resend(resendApiKey)

      // Send the main contact email
      const mainEmailResult = await resend.emails.send({
        from: 'Tech Talk Contact <noreply@jgb.solutions>',
        to: ['services@jgb.solutions'],
        subject: `Nouvo mesaj soti nan ${data.name}: ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <h2 style="color: #0066bf; margin-bottom: 20px;">📧 Nouvo Mesaj nan Tech Talk</h2>

              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p><strong>Non:</strong> ${data.name}</p>
                <p><strong>Imel:</strong> ${data.email}</p>
                <p><strong>Sijè:</strong> ${data.subject}</p>
              </div>

              <div style="border-left: 4px solid #ffa30a; padding-left: 20px; margin: 20px 0;">
                <h3 style="color: #333; margin-top: 0;">Mesaj la:</h3>
                <p style="line-height: 1.6; color: #555;">${data.message.replace(/\n/g, '<br>')}</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #888;">
                <p>Mesaj sa a voye soti nan fòm kontak Tech Talk sou <a href="https://techtalk.jgb.solutions" style="color: #0066bf;">techtalk.jgb.solutions</a></p>
                <p>Tan: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST</p>
              </div>
            </div>
          </div>
        `,
      })

      if (mainEmailResult.error) {
        console.error('Resend main email error:', mainEmailResult.error)
        throw new Error(`Erreur l ap voye imel la: ${mainEmailResult.error.message}`)
      }

      // Send auto-reply to the user
      try {
        await resend.emails.send({
          from: 'Tech Talk Team <noreply@techtalk.jgb.solutions>',
          to: [data.email],
          subject: 'Nou resevwa mesaj ou an - Tech Talk',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #0066bf; margin: 0;">Tech Talk</h1>
                  <p style="color: #ffa30a; font-weight: bold; margin: 5px 0 0 0;">Mesaj ou resevwa!</p>
                </div>

                <p>Salut ${data.name},</p>

                <p>Mèsi pou ou voye nou yon mesaj! Nou resevwa li ak satisfaksyon.</p>

                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #333; margin-top: 0;">Detay mesaj ou an:</h3>
                  <p><strong>Sijè:</strong> ${data.subject}</p>
                  <p><strong>Mesaj ou an:</strong></p>
                  <p style="line-height: 1.6; color: #555; font-style: italic;">"${data.message}"</p>
                </div>

                <p>Ekip Tech Talk la ap revize mesaj ou an ak k ap reponn ou nan <strong>24-48 èdtan</strong>.</p>

                <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h4 style="color: #0066bf; margin-top: 0;">Kisa ki ka enterese ou:</h4>
                  <ul style="color: #555;">
                    <li>Swiv nou sou <a href="https://youtube.com/@JGBSolutions" style="color: #0066bf;">YouTube</a> pou dènye epizòd yo</li>
                    <li>Vin jwenn ak kominote a sou <a href="https://techtalk.jgb.solutions" style="color: #0066bf;">sit entènèt nou an</a></li>
                    <li>Pataje pwojek ou yo ak nou sou sosyal medya yo</li>
                  </ul>
                </div>

                <p>Nan patisans ak teknoloji,<br>
                <strong>Ekip Tech Talk</strong></p>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #888;">
                  <p>Tech Talk - Pòdkas technologie an kreyòl</p>
                  <p><a href="https://techtalk.jgb.solutions" style="color: #0066bf;">techtalk.jgb.solutions</a> | <a href="mailto:services@jgb.solutions" style="color: #0066bf;">services@jgb.solutions</a></p>
                </div>
              </div>
            </div>
          `,
        })
      } catch (autoReplyError) {
        // Don't fail the entire request if auto-reply fails
        console.error('Auto-reply failed:', autoReplyError)
      }

      // Return success response
      return {
        success: true,
        message: 'Mesaj ou voye ak siksè! N ap reponn ou pi vit ke nou kapab.',
        emailId: mainEmailResult.data?.id,
      }

    } catch (error) {
      console.error('Contact function error:', error)

      // Handle validation errors
      if (error instanceof z.ZodError) {
        return {
          success: false,
          message: 'Enfòmasyon ou pa kòrèk. Tanpri verifye tout chan yo.',
          errors: error.issues.reduce((acc, issue) => {
            acc[issue.path[0] as string] = issue.message
            return acc
          }, {} as Record<string, string>),
        }
      }

      // Handle other errors
      const errorMessage = error instanceof Error ? error.message : 'Gen yon erè ki pa previ'
      return {
        success: false,
        message: `Nou gen difikilte voye mesaj ou a. Tanpri eseye ankò oswa kontakte nou dirèkteman sou services@jgb.solutions. Erè: ${errorMessage}`,
      }
    }
  })