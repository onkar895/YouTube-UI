const API_KEY = import.meta.env.GOOGLE_API_KEY;
// Vite uses the 'import.meta.env' object instead of 'process.env' to access environment variables.

if (!API_KEY) {
  console.error("API key is missing. Make sure you have set up the environment variable.");
}

export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=" + API_KEY;
