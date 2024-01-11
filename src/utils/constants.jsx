import { IoMdTrendingUp } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { MdMusicNote } from "react-icons/md";
import { BiSolidMoviePlay } from "react-icons/bi";
import { RiLiveFill } from "react-icons/ri";
import { SiYoutubegaming } from "react-icons/si";
import { PiStudentFill } from "react-icons/pi";
import { SiShopify } from "react-icons/si";
import { GiTrophy } from "react-icons/gi";
import { SiGooglenews } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";
import { TfiYoutube } from "react-icons/tfi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiChatHistoryFill } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import { MdFeedback } from "react-icons/md";

export const Explore = [
  {
    icon: <IoMdTrendingUp className='w-5 h-10' />,
    name: "Trending"
  },
  {
    icon: <HiShoppingBag className='w-5 h-10' />,
    name: "Shopping"
  },
  {
    icon: <MdMusicNote className='w-5 h-10' />,
    name: "Music"
  },
  {
    icon: <BiSolidMoviePlay className='w-5 h-10' />,
    name: "Movies"
  },
  {
    icon: <RiLiveFill className='w-5 h-10' />,
    name: "Live"
  },
  {
    icon: <GiTrophy className='w-5 h-10' />,
    name: "Sports"
  },
  {
    icon: <SiGooglenews className='w-5 h-10' />,
    name: "News"
  },
  {
    icon: <SiYoutubegaming className='w-5 h-10' />,
    name: "Gaming"
  },
  {
    icon: <PiStudentFill className='w-5 h-10' />,
    name: "Learning"
  },
  {
    icon: <SiShopify className='w-5 h-10' />,
    name: "Fashion & Beauty"
  },
]


export const Premium = [
  {
    icon: <FaYoutube className='w-5 h-10' />,
    name: "YouTube Premium"
  },
  {
    icon: <SiYoutubestudio className='w-5 h-10' />,
    name: "YouTube Studio"
  },
  {
    icon: <SiYoutubemusic className='w-5 h-10' />,
    name: "YouTube Music"
  },
  {
    icon: <TfiYoutube className='w-5 h-10' />,
    name: "YouTube Kids"
  },
]

export const Setting = [
  {
    icon: <IoSettingsSharp className='w-5 h-10' />,
    name: "Settings"
  },
  {
    icon: <RiChatHistoryFill className='w-5 h-10' />,
    name: "Report History"
  },
  {
    icon: <IoMdHelpCircle className='w-5 h-10' />,
    name: "Help"
  },
  {
    icon: <MdFeedback className='w-5 h-10' />,
    name: "Send Feedback"
  },
]

export const ButtonNames = [
  "All",
  "Gaming",
  "Mixes",
  "Music",
  "Freecodecamp",
  "Live",
  "Akshay Saini",
  "Comedy",
  "T-series",
  "Movies",
  "Indian Premier League",
  "Programming",
  "Rohit Sharma",
  "Watched",
  "Cricket",
  "Football",
  "News",
  "JavaScript",
  "Prodcasts",
  "Comedy Clubs",
  "Data Structures",
];

export const formatTime = (time) => {
  let a = new Date();
  let b = new Date(time);
  let c = a - b;
  let e = c / (24 * 60 * 60 * 1000).toFixed();
  return e;
};

export const timeDuration = (isoDuration) => {
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let minutesIndex;
  let hoursIndex;

  if (isoDuration.includes("H")) {
    hoursIndex = isoDuration.indexOf("H");
    hours = parseInt(isoDuration.slice(2, hoursIndex));
  }

  if (!hoursIndex) {
    hoursIndex = 1;
  }

  if (isoDuration.includes("M")) {
    minutesIndex = isoDuration.indexOf("M");
    minutes = parseInt(isoDuration.slice(hoursIndex + 1, minutesIndex));
  }
  if (!minutesIndex) {
    minutesIndex = 1;
  }
  const secondsIndex = isoDuration.indexOf("S");
  if (secondsIndex !== -1) {
    seconds = parseInt(isoDuration.slice(minutesIndex + 1, secondsIndex));
  }

  // Format the time
  if (!hours) {
    const formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
    return formattedTime;
  } else {
    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(
      seconds
    )}`;
    return formattedTime;
  }

  // Function to pad single-digit numbers with leading zeros
  function padZero(num) {
    return num < 10 ? `0${num}` : num;
  }
};

export const formatNumberWithSuffix = (x) => {
  if (x === undefined) {
    return 0;
  }
  if (x >= 1000000) {
    return (x / 1000000).toFixed(1) + "M";
  } else if (x >= 1000) {
    return (x / 1000).toFixed(1) + "K";
  }
  return x.toString();
};
