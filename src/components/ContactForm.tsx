import { useState } from 'react';

interface Props {
	formNote: string;
}

type FieldKey = 'name' | 'phone' | 'email' | 'message';

const EMPTY_VALUES: Record<FieldKey, string> = { name: '', phone: '', email: '', message: '' };
const EMPTY_TOUCHED: Record<FieldKey, boolean> = { name: false, phone: false, email: false, message: false };

function getFieldValidity(id: FieldKey, value: string): 'neutral' | 'valid' | 'invalid' {
	const v = value.trim();
	switch (id) {
		case 'name':
			return v.length >= 3 ? 'valid' : 'invalid';
		case 'phone':
			if (v === '') return 'neutral';
			return v.replace(/\D/g, '').length >= 10 ? 'valid' : 'invalid';
		case 'email':
			return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'valid' : 'invalid';
		case 'message':
			return v.length >= 1 ? 'valid' : 'invalid';
	}
}

export default function ContactForm({ formNote }: Props) {
	const [submitting, setSubmitting] = useState(false);
	const [modal, setModal] = useState<{ visible: boolean; success: boolean }>({ visible: false, success: false });
	const [focused, setFocused] = useState<string | null>(null);
	const [values, setValues] = useState<Record<FieldKey, string>>(EMPTY_VALUES);
	const [touched, setTouched] = useState<Record<FieldKey, boolean>>(EMPTY_TOUCHED);
	const [btnHovered, setBtnHovered] = useState(false);

	const isActive = (id: FieldKey) => focused === id || values[id].length > 0;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValues(prev => ({ ...prev, [e.target.name as FieldKey]: e.target.value }));
	};

	const handleBlur = (id: FieldKey) => {
		setFocused(null);
		setTouched(prev => ({ ...prev, [id]: true }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const allTouched: Record<FieldKey, boolean> = { name: true, phone: true, email: true, message: true };
		setTouched(allTouched);

		const isValid = (Object.keys(allTouched) as FieldKey[]).every(
			id => getFieldValidity(id, values[id]) !== 'invalid',
		);
		if (!isValid) return;

		setSubmitting(true);
		const form = e.currentTarget;
		try {
			const res = await fetch('/api/contact', { method: 'POST', body: new FormData(form) });
			if (res.ok) {
				setModal({ visible: true, success: true });
				form.reset();
				setValues(EMPTY_VALUES);
				setTouched(EMPTY_TOUCHED);
			} else {
				setModal({ visible: true, success: false });
			}
		} catch {
			setModal({ visible: true, success: false });
		} finally {
			setSubmitting(false);
		}
	};

	const fieldStyle = (id: FieldKey, isTextarea = false): React.CSSProperties => {
		const isFocused = focused === id;
		const validity = touched[id] ? getFieldValidity(id, values[id]) : 'neutral';

		let border = '1px solid #c8dfe9';
		let background = '#e8f3fa';
		let boxShadow = 'none';

		if (isFocused) {
			border = '1px solid #4892be';
			background = '#d9ecf6';
			boxShadow = '0 0 0 3px rgba(72, 146, 190, 0.2)';
		} else if (validity === 'invalid') {
			border = '1px solid #c97b72';
			background = '#fdf4f3';
		} else if (validity === 'valid') {
			border = '1px solid #82b898';
			background = '#f2f7f4';
		}

		return {
			border,
			borderRadius: '6px',
			padding: isTextarea ? (isActive(id) ? '13px 14px 8px' : '22px 14px 8px') : '13px 14px',
			fontSize: '16px',
			fontFamily: 'inherit',
			color: '#111827',
			background,
			transition: 'border-color 140ms ease, background 140ms ease, padding-top 140ms ease',
			width: '100%',
			boxSizing: 'border-box',
			outline: 'none',
			boxShadow,
		};
	};

	const floatLabelStyle = (id: FieldKey, isTextarea = false): React.CSSProperties => {
		const active = isActive(id);
		return {
			position: 'absolute',
			left: '14px',
			top: active ? '2px' : isTextarea ? '30px' : 'calc(50% + 10px)',
			transform: active || isTextarea ? 'none' : 'translateY(-50%)',
			fontSize: active ? '11px' : '16px',
			fontWeight: 400,
			color: active ? 'var(--color-text-primary)' : '#9ca3af',
			letterSpacing: active ? '0.02em' : '0em',
			pointerEvents: 'none',
			transition: 'top 140ms ease, transform 140ms ease, font-size 140ms ease, color 140ms ease',
			lineHeight: 1,
		};
	};

	const groupStyle: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		paddingTop: '20px',
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
					<label style={floatLabelStyle('name')} htmlFor="name">Name</label>
					<input
						style={fieldStyle('name')}
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						required
						onChange={handleChange}
						onFocus={() => setFocused('name')}
						onBlur={() => handleBlur('name')}
					/>
				</div>
				<div style={groupStyle}>
					<label style={floatLabelStyle('phone')} htmlFor="phone">Phone</label>
					<input
						style={fieldStyle('phone')}
						id="phone"
						name="phone"
						type="tel"
						autoComplete="tel"
						onChange={handleChange}
						onFocus={() => setFocused('phone')}
						onBlur={() => handleBlur('phone')}
					/>
				</div>
				<div style={groupStyle}>
					<label style={floatLabelStyle('email')} htmlFor="email">Email</label>
					<input
						style={fieldStyle('email')}
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						required
						onChange={handleChange}
						onFocus={() => setFocused('email')}
						onBlur={() => handleBlur('email')}
					/>
				</div>
				<div style={groupStyle}>
					<label style={floatLabelStyle('message', true)} htmlFor="message">Message</label>
					<textarea
						style={{ ...fieldStyle('message', true), resize: 'vertical' }}
						id="message"
						name="message"
						rows={5}
						required
						onChange={handleChange}
						onFocus={() => setFocused('message')}
						onBlur={() => handleBlur('message')}
					/>
				</div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
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
								? "Your message has been sent. We'll be in touch shortly."
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
