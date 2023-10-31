import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <>
    <div className="py-6 md:px-12  lg:px-20 xl:px-32 flex flex-col md:flex-row justify-around items-center">

      <div className="md:w-1/4 text-center mb-6">
        <h1 className="title font-bold text-xl mb-4 md:mr-24">Get in touch</h1>
         <div className='flex items-center mb-2'>
            <svg xmlns="http://w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="icon w-4 h-4 font-bold mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="text-black text-lg">shuleni@gmail.com</p>
          </div>
          <div className='flex items-center mb-2'>
            <svg xmlns="http://w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="icon w-4 h-4 font-bold mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.970 1.293c-.282.376-.769.542-1.21.380a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.380-1.210l1.293-.970c-.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5a2.25 2.25 0 00-2.25 2.25v2.25" />
            </svg>
            <p className="text-black text-lg">+2547345687468</p>
          </div>
          <div className='flex items-center mb-2'>
            <svg xmlns="http://w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="icon w-4 h-4 font-bold mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-black text-lg">Ngong Lane Nairobi Kenya</p>
          </div>
        </div>

      <div className="md:w-1/4 text-center mb-6">
        <h1 className="title font-bold text-xl mb-8 md:mr-24">Let's Connect</h1>
        <div className="flex items-center mb-4 md:mb-8">
          <a href="URL_FOR_INSTAGRAM" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="mx-3 cursor-pointer text-4xl" />
          </a>
          <a href="URL_FOR_TWITTER" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} className="mx-3 cursor-pointer text-4xl" />
          </a>
          <a href="URL_FOR_FACEBOOK" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="mx-3 cursor-pointer text-4xl" />
          </a>
        </div>
      </div>

      <div className="md:w-1/4 text-center mb-6">
        <h1 className="title font-bold text-xl mb-4">Sections</h1>
        <ul className="text-black text-lg">
          <li>Home</li>
          <li>About</li>
          <li>User Testimonials</li>
        </ul>
      </div>
    </div>
    <div className="text-center text-sm">@2023 All Rights Reserved</div>
    </>
  );
};
