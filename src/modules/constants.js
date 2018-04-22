export default {
	analyticsList: {
		sessions: {
			singular: "session",
			column: "session_id",
			title: "Sessions",
			column_title: "Session ID"
		},
		users: {
			singular: "user",
			column: "ip",
			title: "Users",
			column_title: "IP address"
		},
		apps: {
			singular: "app",
			column: "event",
			title: "Apps & Modes",
			column_title: "Action ID"
		},
		"locations/countries": {
			singular: "country",
			column: "country_name",
			title: "Countries",
			column_title: "Country"
		},
		"locations/cities": {
			singular: "city",
			column: "city",
			title: "Cities",
			column_title: "City"
		},
		"locations/regions": {
			singular: "region",
			column: "region_name",
			title: "Regions",
			column_title: "Region"
		},
		"locations/zip": {
			singular: "zip",
			column: "zip_code",
			title: "ZIP codes",
			column_title: "ZIP code"
		},
		"browsers/families": {
			singular: "browser",
			column: "browser_name",
			title: "Browsers",
			column_title: "Browser"
		},
		"browsers/engines": {
			singular: "engine",
			column: "browser_engine",
			title: "Rendering engines",
			column_title: "Browser engine"
		},
		os: {
			singular: "os",
			column: "os_name",
			title: "Operating systems",
			column_title: "OS name"
		},
		"devices/manufacturers": {
			singular: "manufacturer",
			column: "device_manufacturer",
			title: "Device manufacturers",
			column_title: "Manufacturer"
		},
		"devices/models": {
			singular: "model",
			column: "device_model",
			title: "Device models",
			column_title: "Model"
		},
		"devices/types": {
			singular: "type",
			column: "device_type",
			title: "Device types",
			column_title: "Type"
		},
		"website/domains": {
			singular: "domain",
			column: "domain",
			title: "Domains",
			column_title: "Domain"
		},
		"website/pages": {
			singular: "page",
			column: "url",
			title: "Pages",
			column_title: "URL"
		},
		"website/referrers": {
			singular: "referrer",
			column: "referrer_domain",
			title: "Referrers",
			column_title: "Referrer"
		},
		"website/referrer-pages": {
			singular: "referrer-page",
			column: "referrer",
			title: "Referrer pages",
			column_title: "Referrer URL"
		}
	}
}