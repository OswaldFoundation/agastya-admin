export default (name = "") => {
	if (name === null) return;
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
	} else {
		return null;
	}
};
