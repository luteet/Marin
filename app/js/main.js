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



const getDeviceType = () => {

	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return "tablet";
	}

	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
		ua
		)
	) {
		return "mobile";
	}
	return "desktop";

};



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



	// =-=-=-=-=-=-=-=-=-=-=-=- <header-nav> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerNavListLink = $(".header__nav-list > li > a")
	if(headerNavListLink) {
	
		if(getDeviceType() != "desktop" && headerNavListLink.parentElement.querySelector("ul")) {
			if(!headerNavListLink.classList.contains("is-active")) {
				event.preventDefault();
				headerNavListLink.classList.add("is-active");
			}
		}
	
	} else if(!$(".header__nav-list > li")) document.querySelectorAll(".header__nav-list > li > a.is-active").forEach(activeLink => activeLink.classList.remove("is-active"))
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-nav> -=-=-=-=-=-=-=-=-=-=-=-=

	
	
	// =-=-=-=-=-=-=-=-=-=-=-=- <header-search> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerSearchTarget = $(".header__search-target")
	if(headerSearchTarget) {
	
		headerSearchTarget.classList.toggle("is-active");
	
	} else if(!$(".header__search")) document.querySelectorAll(".header__search-target.is-active").forEach(target => target.classList.remove("is-active"));
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-search> -=-=-=-=-=-=-=-=-=-=-=-=

	

	// =-=-=-=-=-=-=-=-=-=-=-=- <header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const headerDropDownTarget = $(".header__drop-down-target");
	if(headerDropDownTarget) {
	
		if(headerDropDownTarget.classList.contains("is-active")) {
			document.querySelectorAll(".header__drop-down-target.is-active").forEach(target => target.classList.remove("is-active"));
		} else {
			document.querySelectorAll(".header__drop-down-target.is-active").forEach(target => target.classList.remove("is-active"));
			headerDropDownTarget.classList.add("is-active");
		}
	
	} else if(!$(".header__drop-down")) document.querySelectorAll(".header__drop-down-target.is-active").forEach(target => target.classList.remove("is-active"));
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </header-drop-down> -=-=-=-=-=-=-=-=-=-=-=-=

	

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


	// =-=-=-=-=-=-=-=-=-=-=-=- <checkout-promocode> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const checkoutCartPromoCodeTarget = $(".checkout-cart__promo-code-target");
	if(checkoutCartPromoCodeTarget) {
	
		checkoutCartPromoCodeTarget.classList.toggle("is-active");
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </checkout-promocode> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <checkout-help> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const checkoutHelp = $(".checkout__help");
	if(checkoutHelp) {
	
		if(getDeviceType() != "desktop") {
			if(!checkoutHelp.classList.contains("is-active")) {
				document.querySelectorAll(".checkout__help.is-active").forEach(info => info.classList.remove("is-active"));
				checkoutHelp.classList.add("is-active");
			} else {
				checkoutHelp.classList.remove("is-active");
			}
		}
	
	} else if(!$(".checkout__help")) document.querySelectorAll(".checkout__help.is-active").forEach(info => info.classList.remove("is-active"));
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </checkout-help> -=-=-=-=-=-=-=-=-=-=-=-=


	// =-=-=-=-=-=-=-=-=-=-=-=- <checkout-comment-target> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const checkoutCommentTarget = $(".checkout__comment button")
	if(checkoutCommentTarget) {
	
		checkoutCommentTarget.classList.toggle("is-active");
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </checkout-comment-target> -=-=-=-=-=-=-=-=-=-=-=-=

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



document.querySelectorAll(".checkout__radio input").forEach(checkoutRadioInput => {

	const fieldset = checkoutRadioInput.closest(".checkout__fieldset"),
	blocks = fieldset.querySelectorAll(".checkout__block");

	if(checkoutRadioInput.checked) {
		const targetBlock = checkoutRadioInput.closest(".checkout__block");
		targetBlock.classList.add("is-active");
	}

	checkoutRadioInput.addEventListener("change", () => {
		const targetBlock = checkoutRadioInput.closest(".checkout__block");

		blocks.forEach(block => {
			block.classList.remove("is-active");
		})

		targetBlock.classList.add("is-active")
	})
})



// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
	once: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

