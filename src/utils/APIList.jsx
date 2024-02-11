const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// Vite uses the 'import.meta.env' object instead of 'process.env' to access environment variables.

if (!API_KEY) {
  console.error("API key is missing. Make sure you have set up the environment variable.");
}

export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + API_KEY;

export const YOUTUBE_SEARCH_SUGGESTION_API = "https://corsproxy.org/?https%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26ds%3Dyt%26"

export const CHANNEL_INFO_API = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=" + API_KEY

export const VIDEO_DETAILS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  API_KEY;

export const YOUTUBE_SEARCH_API = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=&key=" + API_KEY;

export const YOUTUBE_SEARCHCATEGORY_API = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&q=&key=" + API_KEY;

export const fetchTagsUrl =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  API_KEY;

export const YOUTUBE_COMMENTS_API = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=&key=${API_KEY}`


