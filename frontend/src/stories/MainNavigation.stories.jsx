import MainNavigation from "../shared/components/Navigation/MainNavigation";

export default {
  title: "MainNavigation",
  component: MainNavigation,
};

export const Basic = () => <MainNavigation/>;
Basic.storyName = "Default";

export const Exceptional = () => <MainNavigation />;
Exceptional.storyName = "Exceptional";