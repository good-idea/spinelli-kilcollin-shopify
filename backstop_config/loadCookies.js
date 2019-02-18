var fs = require('fs')

module.exports = async (page, scenario, c) => {
	var cookies = []
	var cookiePath = scenario.cookiePath || 'backstop_config/cookies.json'

	// READ COOKIES FROM FILE IF EXISTS
	if (fs.existsSync(cookiePath)) {
		cookies = JSON.parse(fs.readFileSync(cookiePath))
		// console.log(('cookie string': cookies))
	}

	// MUNGE COOKIE DOMAIN
	cookies = cookies.map(cookie => {
		cookie.url = 'https://' + cookie.domain
		delete cookie.domain
		return cookie
	})

	// SET COOKIES
	const setCookies = async () => {
		return Promise.all(
			cookies.map(async cookie => {
				await page.setCookie(cookie)
			}),
		)
	}
	await setCookies()
	console.log('Cookie state restored with:', JSON.stringify(cookies, null, 2))
}
