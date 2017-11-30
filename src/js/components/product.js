import $ from 'npm-zepto'

function watchCart(element) {
	const mainContainer = (element instanceof $) ? element : $(element)
	const product = {}

	return product
}

function updateInput(value) {
	this.element.val(value)
}

function updateText(value) {
	this.element.text(value)
}

function buildUpdateField(element) {
	const field = {}
	field.element = (element instanceof $) ? element : $(element)
	field.id = field.element.attr('data-update-field-id')

	const type = element.tagName || element.nodeName
	switch (type.toLowerCase()) {
	case 'input':
		field.update = updateInput
		break
	default:
		field.update = updateText
	}

	if (element.type === 'number') {
		field.max = element.getAttribute('max')
		field.min = element.getAttribute('min')
	}

	return field
}

function alterQuantity(newQuantity, target) {
	let newValue = newQuantity
	const oldValue = parseInt(target.element.val(), 10)
	if (newQuantity === 'plusone') newValue = oldValue + 1
	if (newQuantity === 'minusone') newValue = oldValue - 1
	if (target.min) newValue = Math.max(newValue, target.min)
	if (target.max) newValue = Math.min(newValue, target.max)
	return newValue
}

const valueFunctions = {
	option: function getOptionValue() {
		const triggerElement = this.element[0]
		const index = triggerElement.selectedIndex
		const selectedOption = triggerElement.options[index]
		const value = selectedOption.getAttribute('data-trigger-option-value')
		return value
	},

	minus: function minusValue() {
		return alterQuantity('minusone', this.target)
	},

	plus: function plusValue() {
		return alterQuantity('plusone', this.target)
	},
}

function buildTrigger(element) {
	const trigger = {}
	const valueType = element.getAttribute('data-trigger-value')

	trigger.element = (element instanceof $) ? element : $(element)
	trigger.value = valueFunctions[valueType].bind(trigger) || valueType

	const elementType = (element.tagName || element.nodeName).toLowerCase()
	trigger.event = (elementType === 'input' || elementType === 'select') ? 'change' : 'click'

	return trigger
}

function watchProduct(element) {
	const mainContainer = (element instanceof $) ? element : $(element)
	const product = {}

	const fields = []
	const triggers = []

	mainContainer.find('.product-update-field').each((i, el) => {
		const field = buildUpdateField(el)
		fields.push(field)
	})

	mainContainer.find('.product-update-trigger').each((i, el) => {
		const trigger = buildTrigger(el)
		const targetId = trigger.element.attr('data-trigger-field')
		trigger.target = fields.find(field => field.id === targetId)
		trigger.applyValue = function applyValue() {
			trigger.target.update(trigger.value)
		}
		trigger.element.on(trigger.event, trigger.applyValue)
		triggers.push(trigger)
	})

	return product
}

function watchProducts() {
	const products = $('.product-update')
	products.each((index, product) => {
		watchProduct(product)
		watchCart(product)
	})
}

export default watchProducts
