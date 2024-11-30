const Vehicles = {
	modelx: {
		name: "Model X",
		price: 49990,
		img: "/images/model-y-stealth-grey.jpg",
		images: {
			interior: {
				black: {
					name: "All Black Interior",
					img: "/images/model-y-interior-dark.jpg",
					price: 0,
				},
				white: {
					name: "Black and White Interior",
					img: "/images/model-y-interior-white.jpg",
					price: 1000,
				},
			},
			exterior: {
				stealth_grey: {
					img: "/images/model-y-stealth-grey.jpg",
					price: 0,
				},
				deep_blue_metallic: {
					img: "/images/model-y-deep-blue-metallic.jpg",
					price: 1000,
				},
				pearl_white: {
					img: "/images/model-y-pearl-white.jpg",
					price: 1000,
				},
				quicksilver: {
					img: "/images/model-y-quicksilver.jpg",
					price: 2000,
				},
				solid_black: {
					img: "/images/model-y-solid-black.jpg",
					price: 1500,
				},
				ultra_red: {
					img: "/images/model-y-ultra-red.jpg",
					price: 2000,
				},
			},
			rims: {
				19: {
					name: "19'' Gemini Dark Wheels",
					price: 0,
				},
				20: {
					name: "20'' Induction Wheels",
					price: 2000,
				},
			},
		},
	},
	modely: {
		name: "Model Y",
		price: 49990,
		img: "/images/model-y-stealth-grey.jpg",
		images: {
			interior: {
				black: {
					name: "All Black Interior",
					img: "/images/model-y-interior-dark.jpg",
					price: 0,
				},
				white: {
					name: "Black and White Interior",
					img: "/images/model-y-interior-white.jpg",
					price: 1000,
				},
			},
			exterior: {
				stealth_grey: {
					img: "/images/model-y-stealth-grey.jpg",
					price: 0,
				},
				deep_blue_metallic: {
					img: "/images/model-y-deep-blue-metallic.jpg",
					price: 1000,
				},
				pearl_white: {
					img: "/images/model-y-pearl-white.jpg",
					price: 1000,
				},
				quicksilver: {
					img: "/images/model-y-quicksilver.jpg",
					price: 2000,
				},
				solid_black: {
					img: "/images/model-y-solid-black.jpg",
					price: 1500,
				},
				ultra_red: {
					img: "/images/model-y-ultra-red.jpg",
					price: 2000,
				},
			},
			rims: {
				19: {
					name: "19'' Gemini Dark Wheels",
					price: 0,
				},
				20: {
					name: "20'' Induction Wheels",
					price: 2000,
				},
			},
		},
	},
	cybertruck: {
		name: "CyberTruck",
		price: 39990,
		img: "https://www.tesla.com/sites/default/files/images/cybertruck/cybertruck-social.jpg",
	},
};

const pricingData = {
	models: [
		{
			name: "Model Y",
			trims: [
				{
					name: "Long Range Rear-Wheel Drive",
					pricing: {
						cash: {
							price: 44990,
							incentives: {
								federal: 7500,
								gasSavings: 6000,
							},
						},
						lease: {
							price: 299,
							term: "36 months",
							downPayment: 2999,
							mileageLimit: "10,000 miles",
							incentives: {
								gasSavings: 100,
							},
						},
						finance: {
							price: 481,
							term: "months",
							downPayment: 3999,
							apr: "0",
							duration: "60",
							incentives: {
								federal: 7500,
								gasSavings: 100,
							},
						},
					},
				},
				{
					name: "Long Range All-Wheel Drive",
					pricing: {
						cash: {
							price: 47990,
							incentives: {
								federal: 7500,
								gasSavings: 6000,
							},
						},
						lease: {
							price: 399,
							term: "36 months",
							downPayment: 2999,
							mileageLimit: "10,000 miles",
							incentives: {
								gasSavings: 100,
							},
						},
						finance: {
							price: 531,
							term: "months",
							downPayment: 3999,
							apr: "0",
							duration: "60",
							incentives: {
								federal: 7500,
								gasSavings: 100,
							},
						},
					},
				},
				{
					name: "Performance All-Wheel Drive",
					pricing: {
						cash: {
							price: 51490,
							incentives: {
								federal: 7500,
								gasSavings: 6000,
							},
						},
						lease: {
							price: 599,
							term: "36 months",
							downPayment: 2999,
							mileageLimit: "10,000 miles",
							incentives: {
								gasSavings: 100,
							},
						},
						finance: {
							price: 590,
							term: "months",
							downPayment: 3999,
							apr: "0",
							duration: "60",
							incentives: {
								federal: 7500,
								gasSavings: 100,
							},
						},
					},
				},
			],
		},
	],
};

const CustomizationButtons = {
	interior: {
		black: {
			name: "All Black Interior",
			img: "/images/button-dark.avif",
			desc: "Five Seat Interior",
			price: 0,
		},
		white: {
			name: "Black and White Interior",
			img: "/images/button-light.avif",
			desc: "Five Seat Interior",
			price: 1000,
		},
	},
	exterior: {
		stealth_grey: {
			img: "/images/button-stealth-grey.avif",
			price: 0,
		},
		deep_blue_metallic: {
			img: "/images/button-deep-blue-metallic.avif",
			price: 1000,
		},
		pearl_white: {
			img: "/images/button-pearl-white.avif",
			price: 1000,
		},
		quicksilver: {
			img: "/images/button-quicksilver.avif",
			price: 2000,
		},
		solid_black: {
			img: "/images/button-solid-black.avif",
			price: 1500,
		},
		ultra_red: {
			img: "/images/button-ultra-red.avif",
			price: 2000,
		},
	},
	rims: {
		19: {
			name: "19'' Gemini Dark Wheels",
			price: 0,
			desc: "All-Season Tires",
			range: "337mi",
			rangeMetric: "EPA est.",
			img: "/images/rims/gemini_wheels.avif",
		},
		20: {
			name: "20'' Induction Wheels",
			price: 2000,
			desc: "All-Season Tires",
			range: "314mi",
			rangeMetric: "est.",
			img: "/images/rims/induction_wheels.avif",
		},
	},
};

export { Vehicles, pricingData, CustomizationButtons };
