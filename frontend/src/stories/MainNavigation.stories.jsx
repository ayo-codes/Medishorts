import MainNavigation from "../shared/components/Navigation/MainNavigation";
import { Link } from "react-router-dom";

export default {
  title: "MainNavigation",
  component: MainNavigation,
};

export const Basic = () => <MainNavigation/>;
Basic.storyName = "Default";

export const Exceptional = () => <MainNavigation />;
Exceptional.storyName = "Exceptional";