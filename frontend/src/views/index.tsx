import Wrapper from "../components/Index/Wrapper";
import PopularDishes from "../components/Index/PopularDishes";
import Partners from "../components/Index/Partners";
import Reviews from "../components/Index/Reviews";
import Footer from "../components/Index/Footer";
import React from "react";

function Index() {
  return (
    <>
      <Wrapper />
      <PopularDishes />
      <Partners />
      <Reviews />
      <Footer />
    </>
  );
}

export default Index;
