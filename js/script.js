document.addEventListener("DOMContentLoaded", () => {
	let url = "https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7",
		response = fetch(url),
		post = document.querySelector(".post");

	response
	.then(res => {
		if(res.ok) {
			return res.json();
		} else {
			alert("Ошибка HTTP: " + response.status);
		}
	})
	.then(data => {
		createItem(data);
	});


	let button = document.querySelector('[data-js="search"]'),
		search = document.querySelector('.search input');

	button.addEventListener('click', () => {
		let params = new URLSearchParams({title: search.value}),
			source = `${url}&${params}`;

		fetch(source).then((res) => {
			return res.json();
		}).then((data) => {
			console.log(data);
			if(data.length != 0) document.querySelectorAll(".post__item").forEach((el) => el.remove());
			createItem(data);
		});
	});

	let createItem = (data) => {
		data.forEach((el) => {
			let item = document.createElement("div");
			item.className = "post__item";
			item.innerHTML = `
				<div class="post__item-title">
					${ el.title }
				</div>
				<div class="post__item-description">
					${ el.body }
				</div>
				<input type="checkbox" class="checkbox">
			`;
			post.append(item);
		});

		let checkbox = document.querySelectorAll('.checkbox');
		
		checkbox.forEach((el) => {
			el.addEventListener('change', () => {
				if(el.checked) {
					el.classList.add('checked');
					el.closest(".post__item").classList.add('active');
				} else {
					el.classList.remove('checked');
					el.closest(".post__item").classList.remove('active');
				}
			});
		});
	};
});