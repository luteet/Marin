export default function range() {
	document.querySelectorAll(".products-categories__range").forEach(rangeBlock => {
		
		const rangeElement = rangeBlock.querySelector(".products-categories__range-element"),
		inputMin = rangeBlock.querySelectorAll(".products-categories__range-footer input")[0],
		inputMax = rangeBlock.querySelectorAll(".products-categories__range-footer input")[1];

		const range = noUiSlider.create(rangeElement, {
			start: [Number(rangeBlock.dataset.valueStart), Number(rangeBlock.dataset.valueEnd)],
    		connect: true,
			range: {
				'min': [Number(rangeBlock.dataset.min)],
				'max': [Number(rangeBlock.dataset.max)]
			}
		});

		if(inputMin && inputMax) {
			rangeElement.noUiSlider.on('update', function (values) {
				inputMin.value = Math.round(values[0]);
				inputMax.value = Math.round(values[1]);
			});
		}

	})
}
