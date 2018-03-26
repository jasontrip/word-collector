const handlers = ( () => {

	const loginHandler = event => {
		event.preventDefault()
		const user = {
			username: $('#username').val(),
			password: $('#userPassword').val()
		}
		api.logIn(user)
			.then(authToken => {
				localStorage.setItem('authToken', authToken)
				store.loggedIn = true
				store.username = user.username
				
				render.dom()
			})
			.catch(err => {
				localStorage.removeItem("authToken")
				store.loggedIn = false
				store.username = ''
			})
	}

	const logoutHandler = event => {
		event.preventDefault()
		localStorage.removeItem("authToken")
		store.loggedIn = false
		
		render.dom()
	}

	const createAccountHandler = event => {
		event.preventDefault()
		const user = {
			username: $('#newUsername').val(),
			password: $('#newUserPassword').val()
		}

		api.createAccount(user)
			.then(_user => {
				return api.logIn(user)
					.then(authToken => {
						store.loggedIn = true
						localStorage.setItem('authToken', authToken)
						store.username = user.username
						render.dom()
					})
			})
			.catch(err => {
				console.log("error: " + err)
			})
	}

	const lookupWordHandler = event => {
		event.preventDefault()
		const $targetUsername = $(event.currentTarget).prev('#js-search-word')
		const searchWord = $target.val().trim()
		$target.val('')

		api.lookupWord({searchWord})
			.then(res => {
				// store.lookupWord = res.body.lookupWord.enteredWord
				// console.log("looked up: " + store.lookupWord)
				console.log(res)
			})
	}

	const addTextHandler = event => {
		event.preventDefault()
		console.log('add text')
	}

	return {
		loginHandler,
		logoutHandler,
		createAccountHandler,
		lookupWordHandler,
		addTextHandler
	}
})()