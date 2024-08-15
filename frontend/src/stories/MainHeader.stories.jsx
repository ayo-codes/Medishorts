import MainHeader from "../shared/components/Navigation/MainHeader";

export default {
  title: "MainHeader",
  component: MainHeader,
};

export const Basic = () => <MainHeader />;
Basic.storyName = "Default";

export const Exceptional = () => <MainHeader />;
Exceptional.storyName = "Exceptional";