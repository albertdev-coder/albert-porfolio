import type { APIRoute } from 'astro';
import Resend from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const post: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        const { name, email, message } = data;

        if (!name || !email || !message) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
        }

        const response = await resend.emails.send({
            from: import.meta.env.RESEND_FROM,
            to: import.meta.env.RESEND_TO,
            subject: `New message from ${name}`,
            html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        return new Response(JSON.stringify({ success: true, response }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }
};
