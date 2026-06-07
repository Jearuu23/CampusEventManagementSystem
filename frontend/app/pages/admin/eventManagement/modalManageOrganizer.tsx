import React, { useState, useEffect } from "react";
import { manageOrganizerSchema } from "~/schemas/schemas";

export default function ModalManageOrganizer({
	isOpen,
	onClose,
	organizer,
	onSave,
}: {
	isOpen: boolean;
	onClose: () => void;
	organizer: any;
	onSave: (id: number, data: any) => void;
}) {
	const [editData, setEditData] = useState<any>({});
	const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

	useEffect(() => {
		if (organizer) {
			setEditData({
				name: organizer.name || "",
				org: organizer.org || "",
				email: organizer.email || "",
				status: organizer.status || "pending",
			});
		}
	}, [organizer]);

	if (!isOpen || !organizer) return null;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setValidationErrors({});

		const validationResult = manageOrganizerSchema.safeParse(editData);

		if (!validationResult.success) {
			const fieldErrors = validationResult.error.flatten().fieldErrors;
			const errors: { [key: string]: string } = {};
			for (const key in fieldErrors) {
				errors[key] = fieldErrors[key as keyof typeof fieldErrors]?.[0] || "";
			}
			setValidationErrors(errors);
			return;
		}

		onSave(organizer.id, validationResult.data);
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 fade-in-element">
			<div className="bg-background border border-border rounded-[4px] w-full max-w-md p-6 shadow-xl relative">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors bg-transparent border-none cursor-pointer">
					✕
				</button>
				<h2 className="font-serif text-[24px] font-bold text-text-primary mb-6">Manage Organizer</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Name</label>
						<input
							type="text"
							name="name"
							value={editData.name}
							onChange={handleChange}
							className="bg-surface-secondary border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
						/>
						{validationErrors.name && <span className="text-brand text-[11px] mt-1">{validationErrors.name}</span>}
						{validationErrors.org && <span className="text-brand text-[11px] mt-1">{validationErrors.org}</span>}
						{validationErrors.email && <span className="text-brand text-[11px] mt-1">{validationErrors.email}</span>}
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Organization</label>
						<input
							type="text"
							name="org"
							value={editData.org}
							onChange={handleChange}
							className="bg-surface-secondary border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Email</label>
						<input
							type="email"
							name="email"
							value={editData.email}
							onChange={handleChange}
							className="bg-surface-secondary border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="font-mono text-[10px] uppercase text-text-muted tracking-wider">Status</label>
						<select
							name="status"
							value={editData.status}
							onChange={handleChange}
							className="bg-surface-secondary border border-border-strong px-3 py-2.5 rounded-[2px] text-[13px] text-text-primary outline-none focus:border-brand transition-colors cursor-pointer">
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="rejected">Rejected</option>
						</select>
						{validationErrors.status && <span className="text-brand text-[11px] mt-1">{validationErrors.status}</span>}
					</div>
					<div className="flex justify-end gap-3 mt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-5 py-2.5 border border-border text-text-primary font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-surface-secondary transition-colors cursor-pointer">
							Cancel
						</button>
						<button
							type="submit"
							className="px-5 py-2.5 bg-brand text-background font-mono text-[10px] uppercase tracking-[0.1em] hover:bg-brand/90 transition-colors cursor-pointer">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
