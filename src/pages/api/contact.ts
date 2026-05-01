import type { APIRoute } from 'astro';
import { Resend } from 'resend';

function escapeHtml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export const POST: APIRoute = async ({ request }) => {
	const resend = new Resend(import.meta.env.RESEND_API_KEY);
	const data = await request.formData();

	const name = data.get('name')?.toString().trim() ?? '';
	const phone = data.get('phone')?.toString().trim() ?? '';
	const email = data.get('email')?.toString().trim() ?? '';
	const message = data.get('message')?.toString().trim() ?? '';

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ error: 'Missing required fields' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		await resend.emails.send({
			from: 'Bicardo Builders <info@bicardobuilders.com>',
			to: 'info@bicardobuilders.com',
			replyTo: email,
			subject: `New inquiry from ${name}`,
			html: `
				<p><strong>Name:</strong> ${escapeHtml(name)}</p>
				${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
				<p><strong>Email:</strong> ${escapeHtml(email)}</p>
				<p><strong>Message:</strong></p>
				<p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
			`,
		});
		return new Response(JSON.stringify({ ok: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (err) {
		console.error('Resend error:', err);
		return new Response(JSON.stringify({ error: 'Failed to send email' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
};
