import React from "react";
import Navbar from "./NavBar";
import About from "./About";
import { Footer } from "./Footer";
import TestimonialSlider from "./Testimonial";


const Home = () => {
  return (
    <>
     <Navbar />
     <About />
     <TestimonialSlider />
     <Footer />
    </>
  );
};

export default Home;
