document.getElementById('searchBtn').addEventListener('click', searchMovie);

async function searchMovie() {
    const input = document.getElementById('input').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!input) {
        resultDiv.innerHTML = '<p>Por favor, digite o nome de um filme.</p>';
        return;
    }

    const apiKey = '3c5612e8b5bdf9cc37beb8b9548bed7b'; // Substitua pela sua chave da API
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(input)}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na busca. Tente novamente.');
        }

        const data = await response.json();

        if (data.results.length === 0) {
            resultDiv.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        } else {
            data.results.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.className = 'movie';
                const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : 'https://via.placeholder.com/200';
                movieDiv.innerHTML = `
                    <h3>${movie.title}</h3>
                    <img src="${poster}" alt="${movie.title}" />
                    <p>Data de Lançamento: ${movie.release_date}</p>`;
                resultDiv.appendChild(movieDiv);
            });
        }
    } catch (error) {
        resultDiv.innerHTML = `<p>${error.message}</p>`;
    }
}
