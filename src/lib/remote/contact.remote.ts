import { command } from '$app/server'
import { env } from '$env/dynamic/private'
import { Resend } from 'resend'
import z from 'zod'

const schema = z.object({
  email: z.email(),
  message: z.string().min(1),
})

export const sendMessage = command(schema, async ({ email, message }) => {
  if (!env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY is not set')
    throw new Error('Email service is not configured.')
  }
  if (!env.RESEND_FROM || !env.RESEND_TO) {
    console.error('[contact] RESEND_FROM or RESEND_TO is not set')
    throw new Error('Email service is not configured.')
  }

  const resend = new Resend(env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: `Portfolio <${env.RESEND_FROM}>`,
    to: env.RESEND_TO,
    replyTo: email,
    subject: `Message from ${email}`,
    text: message,
  })

  if (error) {
    console.error('[contact] Resend API error', error)
    throw new Error('Failed to send message.')
  }

  return { success: true }
})
