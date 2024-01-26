const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// Vite uses the 'import.meta.env' object instead of 'process.env' to access environment variables.

if (!API_KEY) {
  console.error("API key is missing. Make sure you have set up the environment variable.");
}

export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + API_KEY;

export const YOUTUBE_SEARCH_API = "https://corsproxy.org/?https%3A%2F%2Fsuggestqueries.google.com%2Fcomplete%2Fsearch%3Fclient%3Dfirefox%26ds%3Dyt%26"

export const CHANNEL_INFO_API = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=" + API_KEY

export const VIDEO_DETAILS_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=" +
  API_KEY;