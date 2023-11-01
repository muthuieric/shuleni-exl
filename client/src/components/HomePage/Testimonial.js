import React, { useState } from 'react';

const testimonials = [
  {
    id: 1,
    author: 'Joe Wesonga',
    text: '“Shuleni has been a game-changer. The platform is easy to use and has transformed our teaching and learning experience. Highly recommended!”',
  },
  {
    id: 2,
    author: 'Lucy Martinez',
    text: '"Using Shuleni has been a breath of fresh air. The platform\'s simplicity and effectiveness have brought a new level of excellence to our education. I can\'t help but endorse it!"',
  },
];

const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="h-80 pb-10 flex flex-col items-center justify-center bg-blue-600">
      <h2 className="text-3xl text-white mb-2">User Testimonials</h2>

      <div className="relative rounded-2xl bg-white p-8 shadow-lg text-center max-w-xl r">
        <button
          onClick={prevTestimonial}
          className="text-blue-600 hover:text-blue-700 transition duration-300 focus:outline-none absolute left-0 top-1/2 transform -translate-y-1/2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <p className="text-lg mb-4">{testimonials[activeIndex].text}</p>
        <p className="text-xl font-bold text-black">{testimonials[activeIndex].author}</p>

        <button
          onClick={nextTestimonial}
          className="text-blue-600 hover:text-blue-700 transition duration-300 focus:outline-none absolute right-0 top-1/2 transform -translate-y-1/2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
