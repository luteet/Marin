export default function checkPasswordQuality() {
	function checkQualityPassword(str) {
		let hasDigits = false,
		hasLetters = false,
		hasSymbols = false;
	
		for (let char of str) {
			if (/[0-9]/.test(char)) {
				hasDigits = true;
			} else if (/[a-zA-Z]/.test(char)) {
				hasLetters = true;
			} else if (/[^a-zA-Z0-9]/.test(char)) {
				hasSymbols = true;
			}
		}
	
		let result = 0;
		if (hasDigits) result++;
		if (hasLetters) result++;
		if (hasSymbols) result++;
	
		return result;
	}
	
	document.querySelectorAll(".auth__password-quality-params").forEach(info => {
		const input = document.querySelector(`#${info.dataset.for}`);
		input.addEventListener("input", () => {
			info.setAttribute("data-quality", checkQualityPassword(input.value));
		})
	})
}