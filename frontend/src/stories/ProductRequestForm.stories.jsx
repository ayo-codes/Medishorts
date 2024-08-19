import ProductRequestForm from "../productRequests/components/ProductRequestForm";




export default {
  title: "ProductRequestForm",
  component: ProductRequestForm,
};

export const Basic = () => <ProductRequestForm />;
Basic.storyName = "Default";

export const Exceptional = () => <ProductRequestForm />;
Exceptional.storyName = "Exceptional";