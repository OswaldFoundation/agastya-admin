export default (name = "") => {
	if (name === null) return;
	const countries = {
		Afghanistan: "AF",
		"Aland Islands": "AX",
		Albania: "AL",
		Algeria: "DZ",
		"American Samoa": "AS",
		Andorra: "AD",
		Angola: "AO",
		Anguilla: "AI",
		Antarctica: "AQ",
		"Antigua and Barbuda": "AG",
		Argentina: "AR",
		Armenia: "AM",
		Aruba: "AW",
		Australia: "AU",
		Austria: "AT",
		Azerbaijan: "AZ",
		Bahamas: "BS",
		Bahrain: "BH",
		Bangladesh: "BD",
		Barbados: "BB",
		Belarus: "BY",
		Belgium: "BE",
		Belize: "BZ",
		Benin: "BJ",
		Bermuda: "BM",
		Bhutan: "BT",
		Bolivia: "BO",
		"Bosnia and Herzegovina": "BA",
		Botswana: "BW",
		"Bouvet Island": "BV",
		Brazil: "BR",
		"British Virgin Islands": "VG",
		"British Indian Ocean Territory": "IO",
		"Brunei Darussalam": "BN",
		Bulgaria: "BG",
		"Burkina Faso": "BF",
		Burundi: "BI",
		Cambodia: "KH",
		Cameroon: "CM",
		Canada: "CA",
		"Cape Verde": "CV",
		"Cayman Islands": "KY",
		"Central African Republic": "CF",
		Chad: "TD",
		Chile: "CL",
		China: "CN",
		"Hong Kong": "HK",
		Macao: "MO",
		"Christmas Island": "CX",
		"Cocos (Keeling) Islands": "CC",
		Colombia: "CO",
		Comoros: "KM",
		"Congo (Brazzaville)": "CG",
		"Congo)": "CD",
		"Cook Islands": "CK",
		"Costa Rica": "CR",
		"Côte d'Ivoire": "CI",
		Croatia: "HR",
		Cuba: "CU",
		Cyprus: "CY",
		"Czech Republic": "CZ",
		Czechia: "CZ",
		Denmark: "DK",
		Djibouti: "DJ",
		Dominica: "DM",
		"Dominican Republic": "DO",
		Ecuador: "EC",
		Egypt: "EG",
		"El Salvador": "SV",
		"Equatorial Guinea": "GQ",
		Eritrea: "ER",
		Estonia: "EE",
		Ethiopia: "ET",
		"Falkland Islands (Malvinas)": "FK",
		"Faroe Islands": "FO",
		Fiji: "FJ",
		Finland: "FI",
		France: "FR",
		"French Guiana": "GF",
		"French Polynesia": "PF",
		"French Southern Territories": "TF",
		Gabon: "GA",
		Gambia: "GM",
		Georgia: "GE",
		Germany: "DE",
		Ghana: "GH",
		Gibraltar: "GI",
		Greece: "GR",
		Greenland: "GL",
		Grenada: "GD",
		Guadeloupe: "GP",
		Guam: "GU",
		Guatemala: "GT",
		Guernsey: "GG",
		Guinea: "GN",
		"Guinea-Bissau": "GW",
		Guyana: "GY",
		Haiti: "HT",
		"Heard and Mcdonald Islands": "HM",
		"Holy See (Vatican City State)": "VA",
		Honduras: "HN",
		Hungary: "HU",
		Iceland: "IS",
		India: "IN",
		Indonesia: "ID",
		Iran: "IR",
		Iran: "IR",
		Iraq: "IQ",
		Ireland: "IE",
		"Isle of Man": "IM",
		Israel: "IL",
		Italy: "IT",
		Jamaica: "JM",
		Japan: "JP",
		Jersey: "JE",
		Jordan: "JO",
		Kazakhstan: "KZ",
		Kenya: "KE",
		Kiribati: "KI",
		"North Korea": "KP",
		"North Korea": "KP",
		"Democratic People's Republic of Korea": "KR",
		"Republic of Korea": "KR",
		Kuwait: "KW",
		Kyrgyzstan: "KG",
		"Lao PDR": "LA",
		Latvia: "LV",
		Lebanon: "LB",
		Lesotho: "LS",
		Liberia: "LR",
		Libya: "LY",
		Liechtenstein: "LI",
		Lithuania: "LT",
		Luxembourg: "LU",
		Macedonia: "MK",
		Madagascar: "MG",
		Malawi: "MW",
		Malaysia: "MY",
		Maldives: "MV",
		Mali: "ML",
		Malta: "MT",
		"Marshall Islands": "MH",
		Martinique: "MQ",
		Mauritania: "MR",
		Mauritius: "MU",
		Mayotte: "YT",
		Mexico: "MX",
		Micronesia: "FM",
		Moldova: "MD",
		Monaco: "MC",
		Mongolia: "MN",
		Montenegro: "ME",
		Montserrat: "MS",
		Morocco: "MA",
		Mozambique: "MZ",
		Myanmar: "MM",
		Namibia: "NA",
		Nauru: "NR",
		Nepal: "NP",
		Netherlands: "NL",
		"Netherlands Antilles": "AN",
		"New Caledonia": "NC",
		"New Zealand": "NZ",
		Nicaragua: "NI",
		Niger: "NE",
		Nigeria: "NG",
		Niue: "NU",
		"Norfolk Island": "NF",
		"Northern Mariana Islands": "MP",
		Norway: "NO",
		Oman: "OM",
		Pakistan: "PK",
		Palau: "PW",
		"Palestinian Territory": "PS",
		Panama: "PA",
		"Papua New Guinea": "PG",
		Paraguay: "PY",
		Peru: "PE",
		Philippines: "PH",
		Pitcairn: "PN",
		Poland: "PL",
		Portugal: "PT",
		"Puerto Rico": "PR",
		Qatar: "QA",
		Réunion: "RE",
		Romania: "RO",
		Russia: "RU",
		"Russian Federation": "RU",
		Rwanda: "RW",
		"Saint-Barthélemy": "BL",
		"Saint Helena": "SH",
		"Saint Kitts and Nevis": "KN",
		"Saint Lucia": "LC",
		"Saint-Martin (French part)": "MF",
		"Saint Pierre and Miquelon": "PM",
		"Saint Vincent and Grenadines": "VC",
		Samoa: "WS",
		"San Marino": "SM",
		"Sao Tome and Principe": "ST",
		"Saudi Arabia": "SA",
		Senegal: "SN",
		Serbia: "RS",
		Seychelles: "SC",
		"Sierra Leone": "SL",
		Singapore: "SG",
		Slovakia: "SK",
		Slovenia: "SI",
		"Solomon Islands": "SB",
		Somalia: "SO",
		"South Africa": "ZA",
		"South Georgia and the South Sandwich Islands": "GS",
		"South Sudan": "SS",
		Spain: "ES",
		"Sri Lanka": "LK",
		Sudan: "SD",
		Suriname: "SR",
		"Svalbard and Jan Mayen Islands": "SJ",
		Swaziland: "SZ",
		Sweden: "SE",
		Switzerland: "CH",
		"Syrian Arab Republic (Syria)": "SY",
		Taiwan: "TW",
		Tajikistan: "TJ",
		Tanzania: "TZ",
		Thailand: "TH",
		"Timor-Leste": "TL",
		Togo: "TG",
		Tokelau: "TK",
		Tonga: "TO",
		"Trinidad and Tobago": "TT",
		Tunisia: "TN",
		Turkey: "TR",
		Turkmenistan: "TM",
		"Turks and Caicos Islands": "TC",
		Tuvalu: "TV",
		Uganda: "UG",
		Ukraine: "UA",
		"United Arab Emirates": "AE",
		"United Kingdom": "GB",
		"United States of America": "US",
		"United States": "US",
		"US Minor Outlying Islands": "UM",
		Uruguay: "UY",
		Uzbekistan: "UZ",
		Vanuatu: "VU",
		Vietnam: "VN",
		"Venezuela (Bolivarian Republic)": "VE",
		"Viet Nam": "VN",
		"Virgin Islands": "VI",
		"Wallis and Futuna Islands": "WF",
		"Western Sahara": "EH",
		Yemen: "YE",
		Zambia: "ZM",
		Zimbabwe: "ZW"
	};
	const slug = name.toLowerCase().replace(/\s+/g, "-");
	switch (slug) {
		case "internet-explorer":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/200px-Internet_Explorer_10%2B11_logo.svg.png";
			break;
		case "mobile-internet-explorer":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Internet_Explorer_10%2B11_logo.svg/200px-Internet_Explorer_10%2B11_logo.svg.png";
			break;
		case "google-search":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
			break;
		case "google-ads-bot":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
			break;
		case "google-web-preview":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
			break;
		case "ios":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/IOS_logo.svg/200px-IOS_logo.svg.png";
			break;
		case "windows":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/200px-Windows_logo_-_2012.svg.png";
			break;
		case "windows-phone":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Windows_logo_-_2012_%28red%29.svg/200px-Windows_logo_-_2012_%28red%29.svg.png";
			break;
		case "android":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/200px-Android_robot.svg.png";
			break;
		case "android-browser":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/200px-Android_robot.svg.png";
			break;
		case "macos":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/MacOS_logo.svg/200px-MacOS_logo.svg.png";
			break;
		case "linux":
			return "https://upload.wikimedia.org/wikipedia/commons/d/dd/Linux_logo.jpg";
			break;
		case "instagram":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/200px-Instagram_logo_2016.svg.png";
			break;
		case "facebook":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/240px-Facebook_logo_%28square%29.png";
			break;
		case "twitter":
			return "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/300px-Twitter_bird_logo_2012.svg.png";
			break;
		case "ubuntu":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ubuntu-Logo_ohne_Schriftzug.svg/200px-Ubuntu-Logo_ohne_Schriftzug.svg.png";
			break;
		case "kaios":
			return "https://pbs.twimg.com/profile_images/909705795226308608/4vt5eXzh_400x400.jpg";
			break;
		case "cloudfare-always-online":
			return null;
			break;
		case "uc-browser":
			return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/uc/uc_48x48.png";
			break;
		case "uc-browser-mini":
			return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/uc/uc_48x48.png";
			break;
		case "chrome-os":
			return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/chrome/chrome_48x48.png";
			break;
		case "yandex-browser":
			return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/yandex/yandex_48x48.png";
			break;
		case "firefox-mobile":
			return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/firefox/firefox_48x48.png";
			break;
		case "opera-mobile":
			return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/opera-mini/opera-mini_48x48.png";
			break;
		case "miui-browser":
			return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/200px-Xiaomi_logo.svg.png";
			break;
		case "bing-preview":
			return "https://image.flaticon.com/icons/svg/174/174838.svg";
			break;
	}
	if (
		[
			"adblock",
			"android-webview-beta",
			"archive",
			"avant",
			"beaker",
			"blisk",
			"brave",
			"browser.html",
			"cent",
			"chrome-beta",
			"chrome-canary",
			"chrome-dev",
			"chrome",
			"chromium",
			"cliqz",
			"cm",
			"crusta",
			"cốc-cốc",
			"dolphin-zero",
			"dolphin",
			"dooble",
			"edge-tile",
			"edge",
			"electron",
			"epic",
			"firefox-beta",
			"firefox-developer-edition",
			"firefox-nightly",
			"firefox",
			"focus",
			"icab-mobile",
			"icecat",
			"iridium",
			"lightning",
			"maxthon",
			"mihtool",
			"min",
			"netsurf",
			"nw.js",
			"onion",
			"opera-beta",
			"opera-developer",
			"opera-mini-beta",
			"opera-mini",
			"opera-neon",
			"opera",
			"orbitum",
			"otter",
			"pale-moon",
			"polarity",
			"puffin",
			"qupzilla",
			"qutebrowser",
			"safari-ios",
			"safari-technology-preview",
			"safari",
			"samsung-internet-beta",
			"samsung-internet",
			"seamonkey",
			"silk",
			"sogou-mobile",
			"tob",
			"tor",
			"uc-mini",
			"uc",
			"v8-ignition",
			"v8-turbofan",
			"v8",
			"vivaldi-snapshot",
			"vivaldi",
			"waterfox",
			"web",
			"yandex-alpha",
			"yandex-beta",
			"yandex-lite",
			"yandex"
		].includes(slug)
	) {
		return "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/" + slug + "/" + slug + "_48x48.png";
	} else if (countries[name]) {
		return "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.9.0/flags/4x3/" + countries[name].toLowerCase() + ".svg";
	} else {
		return null;
	}
};
