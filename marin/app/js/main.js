import sliders from "./sliders.js"
import Popup from "./popup.js"
import range from "./range.js";
import checkPasswordQuality from "./check-password-quality.js";

const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure img');
imageAspectRatio.forEach(imageAspectRatio => {
	if(imageAspectRatio.getAttribute('width') && imageAspectRatio.getAttribute('height'))
		imageAspectRatio.style.setProperty('--aspect-ratio', `${imageAspectRatio.getAttribute("width")}/${imageAspectRatio.getAttribute("height")}`);
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=- <popup> -=-=-=-=-=-=-=-=-=-=-

const popup = new Popup();

popup.init()

// =-=-=-=-=-=-=-=-=-=- </popup> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <click-events> -=-=-=-=-=-=-=-=-=-=-=-=

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}


	// =-=-=-=-=-=-=-=-=-=-=-=- <menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=
	
	if ($('.header__burger')) {
	
		menu.forEach(element => {
			element.classList.toggle('is-mobile-menu-active')
		})
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </menu-in-header> -=-=-=-=-=-=-=-=-=-=-=-=

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <header-search> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerSearchTarget = $(".header__search-target")
	if(headerSearchTarget) {
	
		headerSearchTarget.classList.toggle("is-active");
	
	} else if(!$(".header__search")) document.querySelectorAll(".header__search-target.is-active").forEach(target => target.classList.remove("is-active"));
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-search> -=-=-=-=-=-=-=-=-=-=-=-=

	

	// =-=-=-=-=-=-=-=-=-=-=-=- <header-lang> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerLangTarget = $(".header__lang-target");
	if(headerLangTarget) {
	
		headerLangTarget.classList.toggle("is-active");
	
	} else if(!$(".header__lang")) document.querySelectorAll(".header__lang-target.is-active").forEach(target => target.classList.remove("is-active"));
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-lang> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <product-favorite> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const productFavorite = $(".product__favorite");
	if(productFavorite) {
	
		event.preventDefault();
		productFavorite.classList.toggle("is-active");

		if(productFavorite.classList.contains("is-active")) {
			popup.open("#favorites-popup");
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </product-favorite> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <product-description> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const productDescriptionMore = $(".product__description-more");
	if(productDescriptionMore) {
	
		productDescriptionMore.closest(".product__description").classList.add("is-full");
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </product-description> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <reviews-tabs> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const reviewsTabLink = $(".reviews__tab-link");
	if(reviewsTabLink) {

		event.preventDefault();

		if(!reviewsTabLink.classList.contains("is-active")) {
	
			const 
			wrapper = reviewsTabLink.closest(".reviews"),
			activeBlock = wrapper.querySelector(".reviews__block.is-active"),
			activeLink = wrapper.querySelector(".reviews__tab-link.is-active"),
			targetBlock = wrapper.querySelector(reviewsTabLink.getAttribute("href"));

			if(targetBlock && !wrapper.classList.contains("in-processing")) {

				wrapper.classList.add("in-processing");

				activeLink && activeLink.classList.remove("is-active");
				reviewsTabLink.classList.add("is-active");

				if(activeBlock) {
					activeBlock.classList.remove("is-visible");
					setTimeout(() => {
						activeBlock.classList.remove("is-active");
						targetBlock.classList.add("is-active");
						setTimeout(() => {
							targetBlock.classList.add("is-visible");
							wrapper.classList.remove("in-processing");
						},50)
					},400)
				} else {
					targetBlock.classList.add("is-active");
					setTimeout(() => {
						targetBlock.classList.add("is-visible");
						wrapper.classList.remove("in-processing");
					},50)
				}

			}

		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </reviews-tabs> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <remove-product-from-cart> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const cartItemRemove = $(".cart-item__remove")
	if(cartItemRemove) {
	
		const item = cartItemRemove.closest(".cart-item");

		if(!item.classList.contains("is-removing")) {
			item.classList.add("is-removing");

			setTimeout(() => item.remove(), 450);
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </remove-product-from-cart> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <products-filter> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const productsFilterOpen = $(".products__filter-open")
	if(productsFilterOpen) {
	
		const block = document.querySelector(".products__aside");
		if(!block.classList.contains("in-processing")) {
			block.classList.add("is-active");
			body.classList.add('is-mobile-menu-active');
			setTimeout(() => {
				block.classList.add("is-visible");
			},50)
			setTimeout(() => {
				block.classList.remove("in-processing");
			},450)
		}
		
	
	}

	const productsFilterClose = $(".products__aside-close, .products__aside-background, .products__aside-results")
	if(productsFilterClose) {
	
		const block = document.querySelector(".products__aside");
		if(!block.classList.contains("in-processing")) {
			block.classList.remove("is-visible");
			setTimeout(() => {
				block.classList.remove("is-active");
				body.classList.remove('is-mobile-menu-active');
			},450)
		}
		
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </products-filter> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <account-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const accountNavLink = $(".account__nav > ul > li > a")
	if(accountNavLink) {
	
		if(accountNavLink.closest("li").querySelector("ul .is-current")) {

		}

		if(!accountNavLink.classList.contains("is-active") && !accountNavLink.closest("li").querySelector("ul .is-current")) {
			event.preventDefault();
			accountNavLink.classList.add("is-active");
		}
	
	} else if(!$(".account__nav")) {
		document.querySelectorAll(".account__nav > ul > li > a.is-active").forEach(activeLink => activeLink.classList.remove("is-active"));
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </account-nav> -=-=-=-=-=-=-=-=-=-=-=-=


	
	// =-=-=-=-=-=-=-=-=-=-=-=- <account-order-item> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const accountOrderItemTarget = $(".account-order-item__target")
	if(accountOrderItemTarget) {
	
		const item = accountOrderItemTarget.closest(".account-order-item");
		item.classList.toggle("is-active");
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </account-order-item> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <cart-product-quantity> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const cartItemQuantityPlus = $(".cart-item__quantity-plus")
	if(cartItemQuantityPlus) {
	
		const input = cartItemQuantityPlus.closest(".cart-item__quantity").querySelector("input"),
		max = input.max ?? 1;

		let newValue = Number(input.value) + 1;
		input.value = (newValue <= max) ? newValue : max;
	
	}

	const cartItemQuantityMinus = $(".cart-item__quantity-minus")
	if(cartItemQuantityMinus) {

		const input = cartItemQuantityMinus.closest(".cart-item__quantity").querySelector("input");

		let newValue = Number(input.value) - 1;
		input.value = (newValue >= 1) ? newValue : 1;

	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </cart-product-quantity> -=-=-=-=-=-=-=-=-=-=-=-=

})

// =-=-=-=-=-=-=-=-=-=-=-=- </click-events> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	header && html.style.setProperty("--height-header", header.offsetHeight + "px");

	html.style.setProperty("--vh", (window.innerHeight * 0.01).toFixed(2) + "px");
	windowSize != window.innerWidth && html.style.setProperty("--svh", (window.innerHeight * 0.01).toFixed(2) + "px");
	
	windowSize = window.innerWidth;
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

sliders();

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <input-range> -=-=-=-=-=-=-=-=-=-=-=-=

range();

// =-=-=-=-=-=-=-=-=-=-=-=- </input-range> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <password-quality> -=-=-=-=-=-=-=-=-=-=-=-=

checkPasswordQuality();

// =-=-=-=-=-=-=-=-=-=-=-=- </password-quality> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <product-buy-submit> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll(".product__about").forEach(aboutForm => {
	aboutForm.addEventListener("submit", (event) => {
		event.preventDefault();
		popup.open("#cart-popup");
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </product-buy-submit> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <account-nav> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll(".account__nav > ul > li").forEach(navLI => {
	if(navLI.querySelector("ul .is-current")) {
		navLI.classList.add("has-current-sub");
	}
})

// =-=-=-=-=-=-=-=-=-=-=-=- </account-nav> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
	once: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

