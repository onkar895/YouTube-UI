const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// Vite uses the 'import.meta.env' object instead of 'process.env' to access environment variables.

if (!API_KEY) {
  console.error("API key is missing. Make sure you have set up the environment variable.");
}

export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=" + API_KEY;

export const YOUTUBE_SAERCH_API = "https://clients1.google.com/complete/search?client=youtube&gs_ri=youtube&ds=yt&q="


export const CHANNEL_PROFILE_PICTURE = async (channelId) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
    );
    const data = await res?.json();
    const profilePictureUrl = data?.items[0]?.snippet?.thumbnails?.default?.url;
    return profilePictureUrl;
  } catch (error) {
    console.log("couldn't fetch channel profile picture", error);
  }
};