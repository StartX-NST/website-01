import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
	message: string;
	onClose: () => void;
	duration?: number;
}

export default function Toast({
	message,
	onClose,
	duration = 3000,
}: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return createPortal(
		<div className='fixed top-4 right-4 z-[9999] animate-slide-in-right'>
			<div className='bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 shadow-lg flex items-center gap-3 min-w-[320px]'>
				<CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
				<span className='text-white text-sm flex-1'>{message}</span>
				<button
					onClick={onClose}
					className='text-gray-400 hover:text-white transition-colors'
					aria-label='Close'>
					<X className='w-4 h-4' />
				</button>
			</div>
		</div>,
		document.body
	);
}
