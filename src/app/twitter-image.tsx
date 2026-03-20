import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Agent Stack — Which dev tools are ready for AI agents?";
export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

const PILLARS = [
	{ label: "MCP", color: "#a78bfa" },
	{ label: "API", color: "#60a5fa" },
	{ label: "CLI", color: "#22d3ee" },
	{ label: "Skills", color: "#fbbf24" },
	{ label: "Docs", color: "#34d399" },
];

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				background: "#000",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				fontFamily: "monospace",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						"radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,119,198,0.15), transparent)",
					display: "flex",
				}}
			/>

			<div
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					right: 0,
					height: 3,
					display: "flex",
				}}
			>
				{PILLARS.map((p) => (
					<div
						key={p.label}
						style={{ flex: 1, backgroundColor: p.color, opacity: 0.8 }}
					/>
				))}
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 28,
				}}
			>
				<div
					style={{
						fontSize: 14,
						letterSpacing: 6,
						textTransform: "uppercase",
						color: "#737373",
						display: "flex",
					}}
				>
					crafter.run
				</div>

				<div
					style={{
						fontSize: 68,
						fontWeight: 800,
						color: "#fafafa",
						letterSpacing: -2,
						display: "flex",
					}}
				>
					Agent Stack
				</div>

				<div
					style={{
						fontSize: 22,
						color: "#737373",
						maxWidth: 700,
						textAlign: "center",
						lineHeight: 1.5,
						display: "flex",
					}}
				>
					Which dev tools are ready for AI agents?
				</div>

				<div
					style={{
						display: "flex",
						gap: 24,
						marginTop: 12,
					}}
				>
					{PILLARS.map((p) => (
						<div
							key={p.label}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 8,
							}}
						>
							<div
								style={{
									width: 10,
									height: 10,
									borderRadius: 2,
									backgroundColor: p.color,
									opacity: 0.8,
									display: "flex",
								}}
							/>
							<span style={{ fontSize: 14, color: "#a3a3a3", display: "flex" }}>
								{p.label}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>,
		{ ...size },
	);
}
