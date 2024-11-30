/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				text: ["Universal Sans Text", "sans-serif"],
				display: ["Universal Sans Display", "sans-serif"],
			},
			colors: {
				dimmed: {
					1: "#6B7280",
					2: "#4B5563",
					3: "#d1d5db",
				},
			},
		},
	},
	plugins: [],
};
