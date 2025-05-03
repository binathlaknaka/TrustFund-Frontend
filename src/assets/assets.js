import profile from "./profile.jpeg";
import dropdown_icon from "./dropdown_icon.svg";
import Left from "./Left.png";
import Right from "./Right.png";
import SpaceCity from "./SpaceCity.jpg";
import login from "./login.jpg";
import signup from "./signup.jpg";

export const assets = {
  profile,
  dropdown_icon,
  Left,
  Right,
  login,
  signup,
};

import {
  RxHeartFilled,
  RxAccessibility,
  RxLinkedinLogo,
  RxInstagramLogo,
  RxDiscordLogo,
} from "react-icons/rx";
import { IoLogoFacebook } from "react-icons/io";

export const FooterData = [
  {
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/",
  },
  {
    icon: RxInstagramLogo,
    link: "https://www.instagram.com/",
  },
  {
    icon: RxDiscordLogo,
    link: "https://discord.com/",
  },
  {
    icon: IoLogoFacebook,
    link: "https://www.facebook.com/",
  },
];

export const ServiceData = [
  {
    icon: RxAccessibility,
    title: "Development",
    content: "Lorem ipsum dolor sit /amet, consectetur adipiscing elit.",
    backgroundImage: profile,
  },
  {
    icon: RxHeartFilled,
    title: "Branding",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity,
  },
  {
    icon: RxAccessibility,
    title: "Design",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity,
  },
  {
    icon: RxHeartFilled,
    title: "Seo",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity,
  },
  {
    icon: RxAccessibility,
    title: "Management",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity,
  },
  {
    icon: RxHeartFilled,
    title: "Production",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    backgroundImage: SpaceCity,
  },
];
