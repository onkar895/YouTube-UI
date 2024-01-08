/* eslint-disable no-undef */
const API_KEY = process.env.GOOGLE_API_KEY;

export const YOUTUBE_VIDEO_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=" + API_KEY;
