import { useState } from 'react';

interface Props {
	formNote: string;
}

export default function ContactForm({ formNote }: Props) {
	const [submitting, setSubmitting] = useState(false);
	const [modal, setModal] = useState<{ visible: boolean; success: boolean }>({ visible: false, success: false });
	const [focused, setFocused] = useState<string | null>(null);
	const [btnHovered, setBtnHovered] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitting(true);
		const form = e.currentTarget;
		try {
			const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
			if (res.ok) {
				setModal({ visible: true, success: true });
				form.reset();
			} else {
				setModal({ visible: true, success: false });
			}
		} catch {
			setModal({ visible: true, success: false });
		} finally {
			setSubmitting(false);
		}
	};

	const fieldStyle = (id: string): React.CSSProperties => ({
		border: focused === id ? '1px solid #4892be' : '1px solid #c8dfe9',
		borderRadius: '6px',
		padding: '10px 14px',
		fontSize: '16px',
		fontFamily: 'inherit',
		color: '#111827',
		background: focused === id ? '#d9ecf6' : '#e8f3fa',
		transition: 'border-color 140ms ease, background 140ms ease',
		width: '100%',
		boxSizing: 'border-box',
		outline: 'none',
		boxShadow: focused === id ? '0 0 0 3px rgba(72, 146, 190, 0.2)' : 'none',
	});

	const labelStyle: React.CSSProperties = {
		fontSize: '12px',
		fontWeight: 400,
		color: 'var(--color-text-primary)',
		letterSpacing: '0.02em',
	};

	const groupStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		gap: '6px',
	};

	return (
		<section style={{ marginBottom: '56px' }}>
			<h2 style={{
				fontFamily: '"Manrope", sans-serif',
				textAlign: 'center',
				marginTop: '48px',
				marginBottom: 0,
				fontSize: '32px',
				fontWeight: 300,
				color: 'var(--color-brand-primary)',
				letterSpacing: '0.03em',
			}}>
				Send us a message
			</h2>
			<p
				style={{ color: 'var(--color-text-primary)', textAlign: 'center', width: '100%', fontSize: '16px', margin: '0 0 24px' }}
				dangerouslySetInnerHTML={{ __html: formNote }}
			/>
			<form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit} noValidate>
				<div style={groupStyle}>
					<label style={labelStyle} htmlFor="name">Name</label>
					<input
						style={fieldStyle('name')}
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						required
						onFocus={() => setFocused('name')}
						onBlur={() => setFocused(null)}
					/>
				</div>
				<div style={groupStyle}>
					<label style={labelStyle} htmlFor="phone">Phone</label>
					<input
						style={fieldStyle('phone')}
						id="phone"
						name="phone"
						type="tel"
						autoComplete="tel"
						onFocus={() => setFocused('phone')}
						onBlur={() => setFocused(null)}
					/>
				</div>
				<div style={groupStyle}>
					<label style={labelStyle} htmlFor="email">Email</label>
					<input
						style={fieldStyle('email')}
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						onFocus={() => setFocused('email')}
						onBlur={() => setFocused(null)}
					/>
				</div>
				<div style={groupStyle}>
					<label style={labelStyle} htmlFor="message">Message</label>
					<textarea
						style={{ ...fieldStyle('message'), resize: 'vertical' }}
						id="message"
						name="message"
						rows={5}
						required
						onFocus={() => setFocused('message')}
						onBlur={() => setFocused(null)}
					/>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<button
						type="submit"
						disabled={submitting}
						onMouseEnter={() => setBtnHovered(true)}
						onMouseLeave={() => setBtnHovered(false)}
						style={{
							display: 'inline-block',
							background: btnHovered ? '#3a7aa8' : 'var(--color-brand-secondary)',
							color: 'var(--color-surface-background)',
							boxShadow: '0px 8px 17px -11px #2e2e2f80',
							textDecoration: 'none',
							fontFamily: '"Manrope", sans-serif',
							fontSize: '24px',
							fontWeight: 300,
							letterSpacing: '0.05em',
							textTransform: 'uppercase',
							padding: '12px 54px',
							borderRadius: '50px',
							marginTop: '24px',
							border: 'none',
							cursor: submitting ? 'not-allowed' : 'pointer',
							transition: 'background 140ms ease, transform 140ms ease',
							transform: btnHovered ? 'translateY(-1px)' : 'none',
						}}
					>
						{submitting ? 'Sending…' : 'Send'}
					</button>
				</div>
			</form>

			{modal.visible && (
				<div
					style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
					onClick={() => setModal({ ...modal, visible: false })}
				>
					<div
						style={{ background: 'var(--color-surface-background)', borderRadius: '12px', padding: '40px 48px', maxWidth: '440px', width: '90%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
						onClick={(e) => e.stopPropagation()}
					>
						<p style={{ fontFamily: '"Manrope", sans-serif', fontSize: '18px', fontWeight: 300, color: 'var(--color-text-primary)', margin: '0 0 32px', lineHeight: 1.6 }}>
							{modal.success
								? "Your message has been sent. We’ll be in touch shortly."
								: 'Something went wrong. Please try again or call us directly.'}
						</p>
						<button
							onClick={() => setModal({ ...modal, visible: false })}
							style={{
								background: modal.success ? 'var(--color-brand-primary)' : 'var(--color-brand-secondary)',
								color: 'var(--color-surface-background)',
								border: 'none',
								borderRadius: '50px',
								padding: '10px 36px',
								fontSize: '14px',
								fontWeight: 400,
								letterSpacing: '0.05em',
								textTransform: 'uppercase',
								cursor: 'pointer',
								fontFamily: '"Manrope", sans-serif',
							}}
						>
							Close
						</button>
					</div>
				</div>
			)}
		</section>
	);
}
