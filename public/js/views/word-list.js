const wordList = (() => {

	const render = () => {
		const html = store.user.wordList.map(word => {
			return `
				<div class="word-list-item">
					<div class="word">${word.word}</div>
					<div class="assessment">${word.assessment?word.assessment:'not assessed'}</div>
					<div class="exposures">
						<span class="exposure-count">${word.count}</span> exposures
					</div>
				</div>
			`
		})

		$('main .word-list').html(html)
	}

	return {
		render
	}

})()