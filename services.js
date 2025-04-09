const TMDB = "https://api.themoviedb.org/3/trending/all/week?api_key=a1cf3dcd3fac1adc1ae07fd36b7f92a8";
const PORNHUB = "https://pornhub-scraper-api.onrender.com/api/pornhub/search?query=";

export async function fetchTrending() {
  const res = await fetch(TMDB);
  const data = await res.json();
  return data.results || [];
}

export async function searchPornhub(query) {
  const res = await fetch(`${PORNHUB}${query}`);
  const data = await res.json();
  return data.results || [];
}

export async function getDownloadLinks(url) {
  const res = await fetch(`https://universal-downloader-api.onrender.com/api/extract?url=${encodeURIComponent(url)}`);
  const data = await res.json();
  return data.links || [];
}
