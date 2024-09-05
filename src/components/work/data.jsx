import Image1 from "../../assets/testimonial1.png";
import Image2 from "../../assets/testimonial2.png";
import Image3 from "../../assets/testimonial3.png";
import Image4 from "../../assets/testimonial4.png";
import StakeImage from "../../assets/stake_image.png"; // Ensure you have these images
import CoWorkers from "../../assets/coworkers.png";

export const Data = [
  {
    id: 1,
    image: Image1,
    title: "ChatApp",
    description:
      "It allows you to communicate with your friends through chat., to send and receive messages.",
    category: "Flutter", // Add categories
  },
  {
    id: 2,
    image: Image2,
    title: "Todo List App",
    description:
      "Todo app that maintain our day-to-day tasks or list everything that we have to do.",
    category: "Flutter", // Add categories
  },
  {
    id: 3,
    image: Image3,
    title: "Calculator App",
    description:
      "It will add, subtract, multiply, and divide. Some also do square roots, It is very Fantastic",
    category: "Flutter", // Add categories
  },
  {
    id: 4,
    image: Image4,
    title: "Zoome",
    description:
      "It is a video conferencing platform, and allows users to connect online for video conference meetings, webinars and live chat.",
    category: "Flutter", // Add categories
  },
  {
    id: 5,
    image: StakeImage,
    link: "https://yield-ton.vercel.app/",
    title: "YieldTON",
    description:
      "YieldTON is a decentralized application (DApp) operating on Telegram and the TON blockchain. Our innovative platform is designed to amplify the staking rewards for users holding LST tokens.",
    category: "Website", // New category
  },
  {
    id: 6,
    image: CoWorkers,
    link: "https://co-workers.vercel.app/",
    title: "Co Workers",
    description:
      "Co Workers is the custom online academic help providing service. We just want to provide the help to the students and our papers should be used for the reference purpose only. Nobody is allowed to use our papers for the commercial purpose or without the reference.",
    category: "Website", // New category
  },
];
