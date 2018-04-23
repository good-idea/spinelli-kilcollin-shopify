import $ from 'jquery'

const handleCaptcha = e => {
	e.preventDefault()
	const form = $('form#create_customer')
	const inputs = form.find('input')
}

window.handleRegistrationCaptcha = handleCaptcha
