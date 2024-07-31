var baseUrl = 'https://newsdata.io/api/1/latest?apikey=pub_4953389828bb2e7fcae2c094d4287cf141d86&language=en';
var currentCountry = 'in';
var newsContainer = document.querySelector('.wrapper');
var sports = document.querySelector('#sports');
var tech = document.querySelector('#tech');
var political = document.querySelector('#political');
var entertainment = document.querySelector('#Entertainment');
var welcome = document.querySelector('#welcome');
var country=document.querySelector('#country');
var countryLinks = document.querySelectorAll('#dropdown li div');
countryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        var selectedCountry = link.textContent.trim().toLowerCase();
        if(selectedCountry=='usa'){
            currentCountry='us';
        }
        else if(selectedCountry=='india'){
            currentCountry='in';
        }
        else if(selectedCountry=='uk'){
            currentCountry='gb';
        }
        else if(selectedCountry='canada'){
            currentCountry='ca';
        }
        console.log(currentCountry);
    });
});
function fetchNews(category) {
    var reqUrl = `${baseUrl}&country=${currentCountry}&${category}`;
    fetch(reqUrl)
        .then(response => response.json())
        .then(data => {
            displayNews(data.results);
        })
        .catch(err => {
            console.error('Error fetching news:', err);
        });
}

function displayNews(newsItems) {
    var items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        if (newsItems[index]) {
            item.querySelector('#news-title').textContent = newsItems[index].title;
            item.querySelector('#news-source').textContent = newsItems[index].source_id + ' ' + newsItems[index].pubDate;
            item.querySelector('#news-desc').textContent = newsItems[index].description;
            item.querySelector('#news-img').src = newsItems[index].image_url || 'news.jpg';
            item.querySelector('a').href = newsItems[index].link;
            item.style.display = "block";
            welcome.style.display="none";
            country.style.display="none";
        } else {
            item.style.display = "none";
        }
    });
}

sports.addEventListener("click", (e) => {
    e.preventDefault();
    fetchNews('category=sports');
});
tech.addEventListener("click", (e) => {
    e.preventDefault();
    fetchNews('category=technology');
});
political.addEventListener("click", (e) => {
    e.preventDefault();
    fetchNews('category=politics');
});
entertainment.addEventListener("click", (e) => {
    e.preventDefault();
    fetchNews('category=entertainment');
});
