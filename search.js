// Переменная для хранения данных
let jsonData = [];

// Функция для загрузки файла через input
function loadFile() {
	const fileInput = document.getElementById('fileInput');
	const file = fileInput.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function(e) {
			try {
				jsonData = JSON.parse(e.target.result);
				displayFilePreview(e.target.result);
				resultsContainer.innerHTML = '';
			} catch (error) {
				alert('Invalid JSON file.');
			}
		};
		reader.readAsText(file);
	} else {
		resultsContainer.innerHTML = '<p>Загрузите файл</p>';
	}
}

// Функция для загрузки файла по URL
function loadFromUrl() {
	const urlInput = document.getElementById('urlInput').value.trim();
	if (urlInput) {
		fetch(urlInput)
			.then(response => response.json())
			.then(data => {
				jsonData = data;
				displayFilePreview(JSON.stringify(data, null, 2));
			})
			.catch(error => {
				alert('Не удалось загрузить JSON с URL-адреса.');
			});
	}
}

// Функция для отображения предварительного просмотра файла
function displayFilePreview(content) {
	const filePreview = document.getElementById('filePreview');
	const blob = new Blob([content], { type: 'application/json' });
	filePreview.src = URL.createObjectURL(blob);
}

// Функция поиска
function search() {
	const input = document.getElementById('searchInput').value.toLowerCase();
	const results = jsonData.filter(item => 
		item.title.toLowerCase().includes(input) || 
		item.description.toLowerCase().includes(input)
	);
	displayResults(results);
}

// Функция для отображения результатов
const resultsContainer = document.getElementById('searchResults');
function displayResults(results) {
	resultsContainer.innerHTML = ''; // Очистка предыдущих результатов

	if (results.length === 0) {
		resultsContainer.innerHTML = '<p>Результатов не найдено</p>';
		return;
	}

	const ul = document.createElement('ul');
	results.forEach(item => {
		const li = document.createElement('li');
		li.textContent = `${item.title} - ${item.description}`;
		ul.appendChild(li);
	});
	resultsContainer.appendChild(ul);
}