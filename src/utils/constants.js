export const TMDB_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzFiNDM5MmQzODU1YmIwOTRjMjc1NTM4OTg5ZDQ0MyIsIm5iZiI6MTczNDI4NTQ5My4wNjgsInN1YiI6IjY3NWYxOGI1ZDZmNWU4NDU4YjhiNDIyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x0BG8Fu4wLrE6vucE5p_W_WBWfZA2bxWRgtVh6M38ck'
  }
  };

export const IMG_CDN="https://image.tmdb.org/t/p/w500";

export const BG_LINK='https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_small.jpg'

export const OPEN_AI_KEY = import.meta.env.VITE_OPENAI_API_KEY;