module.exports = async (page, scenario, vp) => {
	console.log('SCENARIO > ' + scenario.label)
	// black out all videos to prevent bad diffs
	await page.evaluate(() => {
		var videos = Array.from(document.querySelectorAll('video')) || []
		videos.map(video => {
			video.style.opacity = 0
		})
	})

	if (scenario.removeSelectors) {
		await page.evaluate(selectors => {
			selectors.map(selector => {
				var el = document.querySelector(selector)
				if (el && el.remove) el.remove()
			})
		}, scenario.removeSelectors)
	}
}
