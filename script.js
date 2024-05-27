document.addEventListener("DOMContentLoaded", () => {
  fetchNews("India");

  const navLinks = document.querySelectorAll(".nav_links ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const category = link.textContent;
      fetchNews(category);
    });
  });

  const searchBox = document.querySelector(".search input");
  const searchButton = document.querySelector(".search button");
  searchButton.addEventListener("click", () => {
    const query = searchBox.value;
    fetchNews(query);
  });

  searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const query = searchBox.value;
      fetchNews(query);
    }
  });
});

async function fetchNews(context) {
  const API_KEY = "f07af928da804e8db8fe1c56e7d64e44";
  const url = `https://newsapi.org/v2/everything?q=${context}&sortBy=popularity&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    //console.log(data);
      console.log(data);

    bindData(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

function fillDataInCard(card_clone, article) {
  const news_img = card_clone.querySelector(".news_img img");
  const title = card_clone.querySelector(".title");
  const news_desc = card_clone.querySelector(".news_desc");
  const readMore = card_clone.querySelector(".read_more");

  if (news_img && title && news_desc && readMore) {
    news_img.src = article.urlToImage;
    title.innerHTML = article.title;
    news_desc.innerHTML = article.description;
    readMore.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  } else {
    console.error("One of the elements is missing in the cloned card");
  }
}

function bindData(articles) {
  const news_card = document.querySelector(".news_card");
  const news_section = document.querySelector(".news");

  news_section.innerHTML = ""; // Clear the existing content i made earlier in html

  articles.forEach((article) => {
    if (!article.urlToImage) return;

    const card_clone = news_card.cloneNode(true);
    fillDataInCard(card_clone, article);
    news_section.appendChild(card_clone);
  });
}
