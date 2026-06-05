export default function Footer() {
	return (
		<footer className="bg-primary-900 text-primary-200 py-10 px-6 md:px-12 border-t border-primary-800 ">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
				<div className="font-bold text-lg text-text-inverse leading-tight text-center md:text-left">
					Campus
					<br />
					Events
				</div>
				<div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium">
					<a href="#" className="hover:text-text-inverse transition-colors">
						Privacy Policy
					</a>
					<a href="#" className="hover:text-text-inverse transition-colors">
						Terms of Service
					</a>
					<a href="#" className="hover:text-text-inverse transition-colors">
						Campus Map
					</a>
					<a href="#" className="hover:text-text-inverse transition-colors">
						Directory
					</a>
					<a href="#" className="hover:text-text-inverse transition-colors">
						Contact Support
					</a>
				</div>
				<div className="text-xs text-primary-400 text-center md:text-right">
					&copy; 2024 University Campus Events.
					<br className="hidden md:block" /> All rights reserved.
				</div>
			</div>
		</footer>
	);
}
