import $ from 'jquery';
import axios from 'axios';

/**
 * A rebuild of Shopify's standard Ajaxifycart script,
 * tailored to SPK. Requires some custom CSS -- See cart.css
 */

const money = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
});

function formatDollars(num) {
	const formatted = money.format(num / 100);
	return formatted;
}

const form = $('form[action="/cart/add"]');
const button = $(form.find('button[type="submit"]'));
const cartElement = $('#cart-menu');
const cartItems = cartElement.find('.cart__menu-items');
const cartItemPrototype = cartElement.find('.cart__menu-item.prototype');
const cartCount = $('#cart-count');
const cartIcon = $('#cart-icon');
const cartTotal = $('#cart-total');

function appendToCart(newItem) {
	const existingItem = cartElement.find(`.cart__menu-item[data-line-item="${newItem.id}"]`);
	const isNew = (existingItem.length === 0);
	const item = (isNew) ? cartItemPrototype.clone().removeClass('prototype') : existingItem;
	item.addClass('test');
	const price = formatDollars(newItem.line_price);
	item.find('.cart__menu-item-price').text(price);

	item.find('.cart__menu-item-title').text(newItem.title);
	const quantityElement = item.find('.cart__menu-item-quantity');
	quantityElement.text(`(${newItem.quantity})`);
	if (newItem.quantity > 1) quantityElement.addClass('has-quantity');

	const src = newItem.image.replace('.jpg', '_medium.jpg');
	console.log(newItem.image, src);
	item.find('img').attr('src', src);
	if (isNew) {
		item.prependTo(cartItems);
		item.attr('data-line-item', newItem.id);
	}
}

$(() => {
	form.on('submit', (e) => {
		e.preventDefault();
		button.attr('data-state', 'thinking');
		const data = form.serialize();
		axios.post('/cart/add.js', data).then((addResponse) => {
			axios.get('/cart.js').then((cartResponse) => {
				button.attr('data-state', 'success');
				cartElement.addClass('has-items');
				cartIcon.addClass('success');
				cartCount.text(cartResponse.data.item_count);
				const total = formatDollars(cartResponse.data.total_price);
				cartTotal.text(total);
				appendToCart(addResponse.data);
				setTimeout(() => {
					cartIcon.removeClass('success');
					button.attr('data-state', '');
				}, 4000);
			});
		}).catch((error) => {
			console.log(error);
			form.off('submit');
			form.submit();
		});
	});
});
