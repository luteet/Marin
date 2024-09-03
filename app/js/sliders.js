export default function sliders() {

	function detectSwipe(element, callback) {
		let touchstartX = 0;
		let touchstartY = 0;
		let touchendX = 0;
		let touchendY = 0;
		let isHorizontalSwipe = false;
	
		element.addEventListener('touchstart', function(event) {
			touchstartX = event.changedTouches[0].screenX;
			touchstartY = event.changedTouches[0].screenY;
			isHorizontalSwipe = false; // Сбрасываем флаг перед началом свайпа
		}, false);
	
		element.addEventListener('touchmove', function(event) {
			const touchCurrentX = event.changedTouches[0].screenX;
			const touchCurrentY = event.changedTouches[0].screenY;
	
			const deltaX = touchCurrentX - touchstartX;
			const deltaY = touchCurrentY - touchstartY;
	
			if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY)) {
				isHorizontalSwipe = true;
			}
	
			if (isHorizontalSwipe) {
				event.preventDefault(); // Отключаем прокрутку, если свайп горизонтальный
			}
		}, false);
	
		element.addEventListener('touchend', function(event) {
			touchendX = event.changedTouches[0].screenX;
			touchendY = event.changedTouches[0].screenY;
	
			const deltaX = touchendX - touchstartX;
			const deltaY = touchendY - touchstartY;
	
			if (Math.abs(deltaX) > Math.abs(deltaY)) {
				if (deltaX > 50) {
					callback('right');
				} else if (deltaX < -50) {
					callback('left');
				}
			} else {
				if (deltaY > 50) {
					callback('down');
				} else if (deltaY < -50) {
					callback('up');
				}
			}
		}, false);
	}

	document.querySelectorAll('.hero__slider').forEach(sliderElement => {

		// Преобразования текста в div строки для анимаций
		let windowSize = 0;

		function resize() {
			if(windowSize != window.innerWidth) {
				if(window.innerWidth <= 992) {
					const textElements = sliderElement.querySelectorAll(".hero-slide__image-text");
					textElements.forEach(textElement => {
						const text = new SplitType(textElement, { types: 'lines' })
						text.lines.map(line => {
							line.innerHTML = `<div class="line-inner">${line.textContent}</div>`;
						})
					})
				} else {
					const textElements = sliderElement.querySelectorAll(".hero-slide__min-image-text");
					textElements.forEach(textElement => {
						const text = new SplitType(textElement, { types: 'lines' })
						text.lines.map(line => {
							line.innerHTML = `<div class="line-inner">${line.textContent}</div>`;
						})
					})
				}
			}

			windowSize = window.innerWidth;
		}

		resize()
		window.addEventListener("resize", resize);


		// Подготовка svg элемента к анимации
		const paths = sliderElement.querySelectorAll('.hero-slide__min-image-decor path');
		paths.forEach(path => {
			const length = path.getTotalLength();

			path.style.setProperty("--dash-array", length);
			path.style.setProperty("--dash-offset", length);
		})

		// Глобальные переменные
		const 
		pagination = sliderElement.querySelector(".hero__pagination"),
		paginationButtons = pagination.querySelectorAll("button"),
		slides = sliderElement.querySelectorAll(".hero__slide");

		let timeoutStart, timeoutEnd, onLoadTimeline = gsap.timeline(), timelines = {
			removeActive: gsap.timeline(),
			setActive: gsap.timeline(),
			setActiveNext: gsap.timeline(),
		};

		// Отслеживания горизонтального свайпа для переключения слайдов
		detectSwipe(sliderElement, (direction) => {
			if(direction == "left") {

				const activeButton = pagination.querySelector("button.is-active"),
				nextEl = activeButton.parentElement.nextElementSibling ?? pagination.querySelector("li");

				nextEl.querySelector("button").click();

			} else if(direction == "right") {

				const activeButton = pagination.querySelector("button.is-active"),
				lengthButtons = pagination.querySelectorAll("button").length,
				prevEl = activeButton.parentElement.previousElementSibling ?? pagination.querySelectorAll("li")[lengthButtons-1];
				prevEl.querySelector("button").click();

			}
		})

		// Переключения слайдов
		paginationButtons.forEach((button, index) => {
			button.addEventListener("click", () => {
				if(!button.classList.contains("is-active") && !pagination.classList.contains("in-progress")) {

					// Избежание лишних кликов
					pagination.classList.add("in-progress");

					// Подготовка таймланов
					for (let key in timelines) {
						timelines[key].kill()
						timelines[key] = gsap.timeline();
						timelines[key].pause();
					}

					if(onLoadTimeline) onLoadTimeline.kill()

					// Основные переменные
					const activeSlide = sliderElement.querySelectorAll(".hero__slide.is-active"),
					activeButton = sliderElement.querySelector(".hero__pagination button.is-active"),
					imageWrapper = slides[index].querySelector(".hero-slide__image-wrapper"),
					textBlock = slides[index].querySelector(".hero-slide__min-image-text"),
					textBlockMob = slides[index].querySelector(".hero-slide__image-text");

					// Переключение active режима на кнопках
					activeButton.classList.remove("is-active");
					button.classList.add("is-active");

					if(window.innerWidth > 992) {

						// Перенос слайда поверх всех остальные
						imageWrapper.style.zIndex = paginationButtons.length+1;
						slides[index].style.zIndex = paginationButtons.length+1;

						// Возврат div линий текста к начальной стадии
						gsap.set(slides[index].querySelectorAll(".hero-slide__min-image-text .line"), {
							"--y": "100%",
						})
					} else {
						// Возврат div линий текста к начальной стадии
						gsap.set(slides[index].querySelectorAll(".hero-slide__image-text .line"), {
							"--y": "100%",
						})
					}

					// Подготовка анимация появления слайда
					if(window.innerWidth > 992) {
						timelines.setActive.to(slides[index].querySelector(".hero-slide__image"), {
							"--opacity": 1,
							duration: 1,
							ease: "power2.inOut",
						})
	
						timelines.setActive.to(slides[index].querySelector(".hero-slide__min-image"), {
							"--opacity": 1,
							delay: 0.3,
							duration: 1,
							ease: "power2.inOut",
						}, "-=1")
	
						gsap.set(slides[index].querySelector(".hero-slide__min-image"), {
							"--x": "9.375rem",
							"--text-opacity": 0
						})

					} else {
						timelines.setActive.to(slides[index].querySelector(".hero-slide__image"), {
							"--opacity": 1,
							duration: 0.7,
							delay: 0.5,
							ease: "power2.inOut",
						})

						gsap.set(slides[index].querySelector(".hero-slide__min-image"), {
							"--opacity": 0,
							"--x": "9.375rem",
							"--text-opacity": 0
						})
					}

					// Установка нового слайда активным
					slides[index].classList.add("is-active");

					// Подготовка к скрытию предыдущего активного слайда
					activeSlide.forEach(activeSlide => {

						activeSlide.classList.add("is-hidden");
						activeSlide.style.removeProperty("z-index");
						activeSlide.querySelector(".hero-slide__image-wrapper").style.removeProperty("z-index");

						if(window.innerWidth < 992) {

							timelines.removeActive.to(activeSlide.querySelector(".hero-slide__image"), {
								"--opacity": 0,
								duration: 0.5,
								ease: "power2.inOut",
							})
							
							timelines.removeActive.to(activeSlide.querySelector(".hero-slide__image"), {
								"--x": "4.375rem",
								"--text-opacity": 0,
								duration: 0.5,
								ease: "power2.inOut",
							},"-=0.5")

							const activeTextBlock = activeSlide.querySelector(".hero-slide__image-text");
	
							timelines.removeActive.to(activeTextBlock.querySelectorAll(".line"), {
								"--y": "100%",
								stagger: 0.1,
								delay: 0,
								duration: 0.5,
								ease: "power2.inOut",
							}, "-=0.5")

							gsap.set(activeSlide.querySelector(".hero-slide__min-image"), {
								"--x": "9.375rem",
								"--text-opacity": 0,
							})

							gsap.set(activeSlide.querySelector(".hero-slide__min-image-decor path"), {
								"--dash-offset": activeSlide.querySelector(".hero-slide__min-image-decor path").getTotalLength(),
							})
	
							gsap.set(activeSlide.querySelector(".hero-slide__min-image-link"), {
								opacity: 0,
								y: "2rem",
							})

						} else {
							timelines.removeActive.to(activeSlide.querySelector(".hero-slide__image"), {
								"--x": "4.375rem",
								"--text-opacity": 0,
								duration: 1,
								ease: "power2.inOut",
							})
	
							timelines.removeActive.to(activeSlide.querySelector(".hero-slide__min-image"), {
								"--x": "9.375rem",
								"--text-opacity": 0,
								delay: 0,
								duration: 1,
								ease: "power2.inOut",
							}, "-=1")
	
							const activeTextBlock = activeSlide.querySelector(".hero-slide__min-image-text");
	
							timelines.removeActive.to(activeTextBlock.querySelectorAll(".line"), {
								"--y": "100%",
								stagger: 0.1,
								delay: 0,
								duration: 1,
								ease: "power2.inOut",
							}, "-=1")
		
							timelines.removeActive.to(activeSlide.querySelector(".hero-slide__min-image-decor path"), {
								"--dash-offset": activeSlide.querySelector(".hero-slide__min-image-decor path").getTotalLength(),
								delay: 0,
								duration: 1,
								ease: "power2.inOut",
							}, "-=1")
	
							timelines.removeActive.to(activeSlide.querySelector(".hero-slide__min-image-link"), {
								opacity: 0,
								y: "2rem",
							}, "-=1")
						}

					})

					// Запуск анимации скрытия активного слайда
					timelines.removeActive.play();
					timelines.setActive.play();
					
					clearTimeout(timeoutStart);
					clearTimeout(timeoutEnd);

					timeoutStart = setTimeout(() => {

						// Удаления класса который блокирует лишние клики
						pagination.classList.remove("in-progress");

						// Окончательные скрытие активного слайда
						activeSlide.forEach(activeSlide => {
							activeSlide.classList.remove("is-active");
							activeSlide.classList.remove("is-hidden");
							activeSlide.classList.remove("is-visible");

							gsap.set(activeSlide.querySelector(".hero-slide__min-image"), {
								"--x": "9.375rem",
								"--text-opacity": 0
							})

							gsap.set(activeSlide.querySelector(".hero-slide__image"), {
								"--opacity": 0,
							})
							gsap.set(activeSlide.querySelector(".hero-slide__min-image"), {
								"--opacity": 0,
							})
						})

						// Удаления класа который скрывает слайд
						slides[index].classList.remove("is-hidden");
						// Добавления класа который показывает слайд
						slides[index].classList.add("is-visible");
						
						// Это должно было сообщить браузеру чтобы он лучше обрабатывал анимации. Врятли это дает эффект но пусть будет
						slides[index].querySelectorAll(".hero-slide__image-decor-text").forEach(text => text.offsetHeight);

						// Подготовка к анимации появления слайда
						if(window.innerWidth > 992) {

							timelines.setActiveNext.to(slides[index].querySelector(".hero-slide__image"), {
								"--x": "0.01rem",
								"--text-opacity": 1,
								duration: 1,
								ease: "power2.inOut",
							})
							
							timelines.setActiveNext.to(slides[index].querySelector(".hero-slide__min-image"), {
								"--x": "0.01rem",
								"--text-opacity": 1,
								duration: 1,
								ease: "power2.inOut",
							}, "-=0.75")

							timelines.setActiveNext.to(textBlock.querySelectorAll(".line"), {
								"--y": "0%",
								stagger: 0.1,
								duration: 1,
								ease: "power2.inOut",
							}, "-=1")

							timelines.setActiveNext.to(slides[index].querySelector(".hero-slide__min-image-decor path"), {
								"--dash-offset": 0,
								duration: 1,
								ease: "power2.inOut",
							}, "-=1")
	
							timelines.setActiveNext.to(slides[index].querySelector(".hero-slide__min-image-link"), {
								opacity: 1,
								y: "0rem",
							}, "-=1")

						} else {

							gsap.set(slides[index].querySelector(".hero-slide__min-image"), {
								"--x": "0.01rem",
								"--text-opacity": 1,
								"--opacity": 1,
							})

							gsap.set(textBlockMob.querySelectorAll(".line"), {
								"--y": "100%",
							})

							gsap.set(slides[index].querySelector(".hero-slide__min-image-decor path"), {
								"--dash-offset": 0,
							})

							gsap.set(slides[index].querySelector(".hero-slide__min-image-link"), {
								opacity: 1,
								y: "0rem",
							})

							timelines.setActiveNext.to(slides[index].querySelector(".hero-slide__image"), {
								"--x": "0.01rem",
								"--text-opacity": 1,
								duration: 0.7,
								ease: "power2.inOut",
							})

							timelines.setActiveNext.to(textBlockMob.querySelectorAll(".line"), {
								"--y": "0%",
								stagger: 0.1,
								duration: 0.7,
								ease: "power2.inOut",
							},"-=0.7")
						}

						// Запуск анимации появления слайда
						timelines.setActiveNext.play();

					},window.innerWidth > 992 ? 1200 : 600)

					// Сброс z-index к режиму по умолчанию
					timeoutEnd = setTimeout(() => {
						slides[index].style.removeProperty("z-index");
						imageWrapper.style.removeProperty("z-index");
					},window.innerWidth > 992 ? 2500 : 2000)
				}

			})
		})

		const activeSlide = sliderElement.querySelector(".hero-slide.is-active");

		// Создание css переменных для анимаций
		slides.forEach(slide => {
			gsap.set(slide.querySelector(".hero-slide__image"), {
				"--x": "4.375rem",
				"--opacity": 0,
				"--text-opacity": 0,
			})

			gsap.set(slide.querySelector(".hero-slide__min-image"), {
				"--x": "9.375rem",
				"--text-opacity": 0,
				"--opacity": 0,
			})

			if(window.innerWidth > 992) {
				gsap.set(slide.querySelectorAll(".hero-slide__min-image-text .line"), {
					"--y": "100%",
				})
			} else {
				gsap.set(slide.querySelectorAll(".hero-slide__image-text .line"), {
					"--y": "100%",
				})
			}

			gsap.set(slide.querySelector(".hero-slide__min-image-decor path"), {
				"--dash-offset": slide.querySelector(".hero-slide__min-image-decor path").getTotalLength(),
			})

			gsap.set(slide.querySelector(".hero-slide__min-image-link"), {
				opacity: 0,
				y: "2rem",
			})
		})

		// Запуск анимации появления активного слайда при загрузке сайта
		window.addEventListener("load", () => {
			setTimeout(() => {

				sliderElement.classList.add("is-init")
				sliderElement.classList.add("is-first-start");

				gsap.set(activeSlide.querySelector(".hero-slide__image"), {
					"--opacity": 1,
				})

				if(window.innerWidth > 992) {
	
					onLoadTimeline.to(activeSlide.querySelector(".hero-slide__image"), {
						"--x": "0.01rem",
						"--text-opacity": 1,
						duration: 1,
						delay: 0.2,
						ease: "power2.inOut",
					})

					onLoadTimeline.to(activeSlide.querySelector(".hero-slide__min-image"), {
						"--opacity": 1,
						duration: 1,
						ease: "power2.inOut",
					}, "-=1")

					onLoadTimeline.to(activeSlide.querySelector(".hero-slide__min-image"), {
						"--x": "0.01rem",
						"--text-opacity": 1,
						duration: 1,
						ease: "power2.inOut",
					}, "-=0.7")

					onLoadTimeline.to(activeSlide.querySelectorAll(".hero-slide__min-image-text .line"), {
						"--y": "0%",
						duration: 1,
						stagger: 0.1,
						ease: "power2.inOut",
					}, "-=0.7")

					onLoadTimeline.to(activeSlide.querySelector(".hero-slide__min-image-decor path"), {
						"--dash-offset": 0,
						duration: 1,
						ease: "power2.inOut",
					}, "-=0.7")

					onLoadTimeline.to(activeSlide.querySelector(".hero-slide__min-image-link"), {
						opacity: 1,
						y: "0rem",
						duration: 1,
						ease: "power2.inOut",
					}, "-=0.7")

				} else {
					onLoadTimeline.to(activeSlide.querySelector(".hero-slide__image"), {
						"--x": "0.01rem",
						"--text-opacity": 1,
						duration: 1,
						delay: 0.2,
						ease: "power2.inOut",
					})

					onLoadTimeline.to(activeSlide.querySelectorAll(".hero-slide__image-text .line"), {
						"--y": "0%",
						duration: 1,
						stagger: 0.1,
						ease: "power2.inOut",
					}, "-=1.25")
				}

				onLoadTimeline.play();

				setTimeout(() => {
					sliderElement.classList.remove("is-first-start");
				},3000)
			}, 0)
		})
		
	})

	document.querySelectorAll('.products-slider').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			type: "loop",
			perPage: 4,
			pagination: false,
			gap: "2.0625rem",

			perMove: 1,
			speed: 500,
			easing: "ease",

			updateOnMove: true,
	
			breakpoints: {
				1440: {
					perPage: 3,
				},
				992: {
					destroy: true,
				},

				768: {
					perPage: 2,
				},
	
				550: {
					perPage: 1,
				}
			}
	
		});
	
		slider.mount();
	
	})

	document.querySelectorAll('.product-main-gallery').forEach(sliderElement => {
	
		const slider = new Splide(sliderElement, {
	
			type: "fade",
			rewind: true,
			perPage: 1,

			pagination: false,

			speed: 700,
			easing: "ease",
	
		});

		const thumbSlider = new Splide(sliderElement.parentElement.querySelector(".product-pagination-gallery"), {
	
			direction: "ttb",
			perPage: 4,

			height: "78%",
			gap: "0.9375rem",

			pagination: false,
			arrows: false,
			isNavigation: true,

			speed: 700,
			easing: "ease",

			breakpoints: {
				992: {
					direction: "ltr",
					height: "auto",
					gap: "0.5rem"
				}
			}
	
		});
	
		thumbSlider.sync(slider);
		slider.mount();
		thumbSlider.mount();
	
	})
}