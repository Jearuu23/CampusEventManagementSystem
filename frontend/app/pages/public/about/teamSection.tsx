import React from "react";

export default function TeamSection() {
	return (
		<section className="py-[100px] px-8 md:px-20 bg-background">
			<div className="flex items-baseline justify-between mb-[60px] fade-in-element">
				<div>
					<div className="font-mono text-[11px] tracking-[0.2em] uppercase text-brand flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-6 before:h-px before:bg-brand">
						The People
					</div>
					<h2 className="font-serif text-[clamp(36px,3.5vw,52px)] font-bold leading-[1.1]">Meet the Team</h2>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border border border-border">
				{[
					{
						name: "Karl Eriel Atabay",
						role: "UI/UX Designer",
						desc: "UI/UX Designer for the frontend and backend of ACTIVO: A GAMIFIED CAMPUS EVENT MANAGEMENT SYSTEM.",
						img: "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/703844552_2057655178429068_3127529330209590744_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1080&ctp=s1080x1080&_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEhqlb9BKZfInhzSCbAgnvF6SamW2d_zfHpJqZbZ3_N8YMeXh0jwpxDKTvoxEpGosHibMctMzUOejapRXDjiK1C&_nc_ohc=w6G-dA0lEaIQ7kNvwHp2lri&_nc_oc=AdplB55W_cYnX8eqy5CSrcX1JGgXWapPczHMzBzCLJAaIhRXpf5ae2fLwigkh-Eo_g9zQWBK4qMs8PsaD9nyCTxX&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=tPho6JaMUDMXAPIPybSGNg&_nc_ss=7b2a8&oh=00_Af-uXYZ84AqiMYh2d3ZHnQXXaaBm4W-NNtDUWOO9EryEqg&oe=6A2B586F",
					},
					{
						name: "Lhanz Hubilia",
						role: "Project Manager",
						desc: "Project Manager for the frontend and backend of ACTIVO: A GAMIFIED CAMPUS EVENT MANAGEMENT SYSTEM.",
						img: "https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/474480613_1720069648906936_8895459287915899429_n.jpg?stp=dst-jpg_tt6&cstp=mx949x960&ctp=s949x960&_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFeauvnVgdCjzztUtE-5Vg7ZOt9y0_m4oxk633LT-bijNahm6Mks-8Yy2bTG_s35rNTlidNUTf1fe-g13ndC_to&_nc_ohc=tC94DeuPqgUQ7kNvwFvxUBG&_nc_oc=AdpCEuUKRTqVyrdKglQDSBj67G7_vjx7mXshVERwFapeYHpnBus2kwXWGhMvEtTAiweGwPk5kN2q3h-0up018b2S&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=W6e30Pr83bLMiddGOOQ9RQ&_nc_ss=7b2a8&oh=00_Af_KR1FjAo0-QZ6xmqFlR7Lxhu4SGJnZ8VI77ARoqmWBiQ&oe=6A2B6213",
					},
					{
						name: "Romar Dela Cruz",
						role: "UI/UX Designer",
						desc: "UI/UX Designer for the frontend and backend of ACTIVO: A GAMIFIED CAMPUS EVENT MANAGEMENT SYSTEM.",
						img: "https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-1/494543037_4182907921993078_7941717320138774933_n.jpg?stp=dst-jpg_tt6&cstp=mx953x960&ctp=s200x200&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHgqU3Hmk6f7pCJl0GdXAvwtvQq8v7VDFe29Cry_tUMV9Mb89Xs99HT3V-9RhO0x80b6r4Cs-J80qsjlYhgltoP&_nc_ohc=CTGBQbJVjwUQ7kNvwGpZzvm&_nc_oc=AdqIrr8n4hOqT96yjy-DdiR1l4q3FQigvZxJ-vP2h-h5VAQpgwJDIKD64K5fcwwt-vfYpCRk-gs1UpR7cpbYlxtF&_nc_zt=24&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=qh_vS594M1slEyvFcpldwg&_nc_ss=7b2a8&oh=00_Af9omzTV3HPqi8RBJw7786aY9bMp9jlhYPm5EBEwQDIR1A&oe=6A2B6BA6",
					},
					{
						name: "Vicente Lepardo Jr",
						role: "Developer",
						desc: "Developer for the frontend and backend of ACTIVO: A GAMIFIED CAMPUS EVENT MANAGEMENT SYSTEM.",
						img: "https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/365444695_6447148045379238_4882929975023196931_n.jpg?stp=dst-jpg_tt6&cstp=mx960x960&ctp=s960x960&_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEaCRPS-czihBMjGMYjBVgMaCKH6GXzTDJoIofoZfNMMgwd1U9H8tjQhC-ad7R6Dk1davuaZzbgDOI6vSeeXj7L&_nc_ohc=m0vqjEZ3-8MQ7kNvwGjNZ8l&_nc_oc=AdqwbNO5EgF4JdV7qr-VXJVhI1YSlbrDcUJ8wml64gWlFSrOaqYJqmnu3Y0CF_gS0CZb1yFsaZP_-X-cs5F6zbzr&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&_nc_gid=NQOMQqrbJNMfq8tMUK_lXQ&_nc_ss=7b2a8&oh=00_Af95EjJpj_yMyYZK_V_6rvmPPyQUW1NanpJdzxiZxlcbHA&oe=6A2B5ED4",
					},
				].map((member, i) => (
					<div key={i} className="bg-background py-9 px-7 flex flex-col gap-4 transition-colors hover:bg-surface-secondary fade-in-element">
						<div className="w-16 h-16 rounded-[2px] bg-text-primary flex items-center justify-center overflow-hidden shrink-0 relative">
							<svg
								width="36"
								height="36"
								viewBox="0 0 24 24"
								fill="none"
								stroke="var(--color-background)"
								strokeWidth="1.5"
								className="opacity-40 absolute z-0">
								<circle cx="12" cy="8" r="4" />
								<path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
							</svg>
							{member.img && (
								<img
									src={member.img}
									alt={member.name}
									className="w-full h-full object-cover relative z-10"
									onError={(e) => {
										e.currentTarget.style.display = "none";
									}}
								/>
							)}
						</div>
						<div>
							<div className="font-serif text-[20px] font-bold leading-[1.2] text-text-primary">{member.name}</div>
							<div className="font-mono text-[10px] tracking-[0.14em] uppercase text-brand mt-1">{member.role}</div>
						</div>
						<div className="text-[13px] text-text-muted font-light leading-[1.5] border-t border-border pt-3.5 mt-auto">
							{member.desc}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
