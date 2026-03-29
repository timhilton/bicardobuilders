import { useState, useEffect, useRef } from 'react';

interface Props {
	images: string[];
	showDotNav?: boolean;
	className?: string;
}

export default function HeroCarousel({ images, showDotNav = false, className = 'hero__gallery' }: Props) {
	const [current, setCurrent] = useState(0);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		if (images.length <= 1) return;

		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 5000);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [images.length]);

	const windowStart = images.length <= 7
		? 0
		: Math.min(Math.max(current - 3, 0), images.length - 7);
	const visibleCount = Math.min(images.length, 7);

	const getDotSize = (posInWindow: number): number => {
		if (images.length <= 7) return 8;
		const hasMore = windowStart + 7 < images.length;
		const hasPrev = windowStart > 0;
		if (hasMore && posInWindow === 6) return 4;
		if (hasMore && posInWindow === 5) return 6;
		if (hasPrev && posInWindow === 0) return 4;
		if (hasPrev && posInWindow === 1) return 6;
		return 8;
	};

	const goTo = (index: number) => {
		setCurrent(index);
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % images.length);
		}, 5000);
	};

	return (
		<div className={className}>
			{images.map((src, i) => (
				<img
					key={src}
					src={src}
					alt=""
					className="hero__img"
					style={{ opacity: i === current ? 1 : 0 }}
					loading={i === 0 ? 'eager' : 'lazy'}
				/>
			))}
			{showDotNav && (
				<div className="hero__dotnav">
					{Array.from({ length: visibleCount }, (_, pos) => {
						const i = windowStart + pos;
						return (
							<button
								key={i}
								className={`hero__dot${i === current ? ' hero__dot--active' : ''}`}
								onClick={() => goTo(i)}
								aria-label={`Go to slide ${i + 1}`}
								style={{ width: `${getDotSize(pos)}px`, height: `${getDotSize(pos)}px` }}
							/>
						);
					})}
				</div>
			)}
		</div>
	);
}
