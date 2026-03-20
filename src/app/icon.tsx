import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				width: 32,
				height: 32,
				background: "#000",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: 6,
				position: "relative",
				overflow: "hidden",
			}}
		>
			<div
				style={{
					fontSize: 20,
					fontWeight: 900,
					color: "#fafafa",
					letterSpacing: -1,
					display: "flex",
					marginTop: -2,
				}}
			>
				A
			</div>
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
				<div style={{ flex: 1, backgroundColor: "#a78bfa" }} />
				<div style={{ flex: 1, backgroundColor: "#60a5fa" }} />
				<div style={{ flex: 1, backgroundColor: "#22d3ee" }} />
				<div style={{ flex: 1, backgroundColor: "#fbbf24" }} />
				<div style={{ flex: 1, backgroundColor: "#34d399" }} />
			</div>
		</div>,
		{ ...size },
	);
}
