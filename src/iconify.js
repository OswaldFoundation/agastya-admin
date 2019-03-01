export default q => {
  q = typeof q === "string" ? q.toLowerCase() : q;
  q = typeof q === "string" ? q.trim() : q;
  if (!q)
    return "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Oswald_Labs_New_Logo.svg/200px-Oswald_Labs_New_Logo.svg.png";
  let answer = false;
  switch (q) {
    case "xiaomi":
      answer = "/img/logos/xiaomi.png";
      break;
    case "motorola":
      answer = "/img/logos/motorola.png";
      break;
    case "lyf":
      answer = "/img/logos/lyf.png";
      break;
    case "obigo q":
      answer = "/img/logos/obigo q.png";
      break;
    case "lg":
      answer = "/img/logos/lg.png";
      break;
    case "oneplus":
      answer = "/img/logos/oneplus.png";
      break;
    case "windows phone":
      answer = "/img/logos/windows-phone.png";
      break;
    case "cloudflare always online":
      answer = "/img/logos/cloudflare-always-online.png";
      break;
    case "nokia":
      answer = "/img/logos/nokia.png";
      break;
    case "nokia x platform":
      answer = "/img/logos/nokia.png";
      break;
    case "oppo":
      answer = "/img/logos/oppo.png";
      break;
    case "samsung":
      answer = "/img/logos/samsung.png";
      break;
    case "android":
      answer = "/img/logos/android.png";
      break;
    case "facebook messenger":
      answer = "/img/logos/facebook-messenger.png";
      break;
    case "instagram":
      answer = "/img/logos/instagram.png";
      break;
    case "apple":
      answer = "/img/logos/apple.png";
      break;
    case "internet explorer":
      answer = "/img/logos/internet-explorer.png";
      break;
    case "ios":
      answer = "/img/logos/ios.png";
      break;
    case "linux":
      answer = "/img/logos/linux.png";
      break;
    case "macos":
      answer = "/img/logos/macos.png";
      break;
    case "miui browser":
      answer = "/img/logos/miui-browser.png";
      break;
    case "mobile internet explorer":
      answer = "/img/logos/mobile-internet-explorer.png";
      break;
    case "os x":
      answer = "/img/logos/os-x.png";
      break;
    case "uc browser":
      answer = "/img/logos/uc-browser.png";
      break;
    case "wechat":
      answer = "/img/logos/wechat.png";
      break;
    case "windows":
      answer = "/img/logos/windows.png";
      break;
    case "googlebot":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
      break;
    case "google-search":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
      break;
    case "google-ads-bot":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
      break;
    case "google-web-preview":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/200px-Google_%22G%22_Logo.svg.png";
      break;
    case "windows-phone":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Windows_logo_-_2012_%28red%29.svg/200px-Windows_logo_-_2012_%28red%29.svg.png";
      break;
    case "android-browser":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/200px-Android_robot.svg.png";
      break;
    case "facebook":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/240px-Facebook_logo_%28square%29.png";
      break;
    case "facebook-messenger":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/200px-Facebook_Messenger_logo.svg.png";
      break;
    case "twitter":
      answer =
        "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/300px-Twitter_bird_logo_2012.svg.png";
      break;
    case "ubuntu":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Ubuntu-Logo_ohne_Schriftzug.svg/200px-Ubuntu-Logo_ohne_Schriftzug.svg.png";
      break;
    case "kaios":
      answer =
        "https://pbs.twimg.com/profile_images/909705795226308608/4vt5eXzh_400x400.jpg";
      break;
    case "cloudfare-always-online":
      answer = null;
      break;
    case "uc-browser":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/uc/uc_48x48.png";
      break;
    case "uc-browser-mini":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/uc/uc_48x48.png";
      break;
    case "chrome-os":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/chrome/chrome_48x48.png";
      break;
    case "yandex-browser":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/yandex/yandex_48x48.png";
      break;
    case "yandex-anti-virus":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/yandex/yandex_48x48.png";
      break;
    case "samsung-browser":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/samsung-internet/samsung-internet_48x48.png";
      break;
    case "phantomjs":
      answer =
        "https://pbs.twimg.com/profile_images/1884362265/phantomjs_400x400.png";
      break;
    case "firefox-mobile":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/firefox/firefox_48x48.png";
      break;
    case "opera-mobile":
      answer =
        "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/opera-mini/opera-mini_48x48.png";
      break;
    case "miui-browser":
      answer =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/200px-Xiaomi_logo.svg.png";
      break;
    case "bing-preview":
      answer = "https://image.flaticon.com/icons/svg/174/174838.svg";
      break;
    case "europe":
      answer =
        "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.9.0/flags/4x3/eu.svg";
      break;
  }
  if (
    [
      "adblock",
      "android webview beta",
      "archive",
      "avant",
      "beaker",
      "blisk",
      "brave",
      "cent",
      "chrome beta",
      "chrome canary",
      "chrome dev",
      "chrome",
      "chromium",
      "cliqz",
      "cm",
      "crusta",
      "cốc-cốc",
      "dolphin zero",
      "dolphin",
      "dooble",
      "edge tile",
      "edge",
      "electron",
      "epic",
      "firefox beta",
      "firefox developer edition",
      "firefox nightly",
      "firefox",
      "focus",
      "icab mobile",
      "icecat",
      "iridium",
      "lightning",
      "maxthon",
      "mihtool",
      "min",
      "netsurf",
      "nw.js",
      "onion",
      "opera beta",
      "opera developer",
      "opera mini beta",
      "opera mini",
      "opera neon",
      "opera",
      "orbitum",
      "otter",
      "pale moon",
      "polarity",
      "puffin",
      "qupzilla",
      "qutebrowser",
      "safari ios",
      "safari technology preview",
      "safari",
      "samsung internet beta",
      "samsung internet",
      "seamonkey",
      "silk",
      "sogou mobile",
      "tob",
      "tor",
      "uc mini",
      "uc",
      "v8 ignition",
      "v8 turbofan",
      "v8",
      "vivaldi snapshot",
      "vivaldi",
      "waterfox",
      "web",
      "yandex alpha",
      "yandex beta",
      "yandex lite",
      "yandex"
    ].includes(q)
  )
    answer =
      answer ||
      "https://raw.githubusercontent.com/alrra/browser-logos/0adf3706/src/" +
        q.replace(/ /g, "-") +
        "/" +
        q.replace(/ /g, "-") +
        "_48x48.png";
  answer =
    answer ||
    "https://tse2.mm.bing.net/th?q=" +
      encodeURIComponent(q) +
      "+icon&w=300&h=300&p=0&dpr=2&adlt=moderate&c=1";
  return answer;
};
