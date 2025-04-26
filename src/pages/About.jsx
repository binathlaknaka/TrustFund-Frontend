import React from 'react';
import { Helmet } from 'react-helmet-async';
import Facebook from '../assets/Facebook.png';
import Instagram from '../assets/Instagram.png';
import LinkedIn from '../assets/LinkedIn.png';
import TwitterX from '../assets/TwitterX.png';
import AboutImage from '../assets/AboutImage.png';

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Who we are?</h1>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-2/5">
          <img 
            src={AboutImage}
            alt="Donor text pattern" 
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
        
        <div className="w-full md:w-3/5">
          <h2 className="text-xl font-bold mb-4 text-black">TrustFund Community</h2>
          <p className="text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and 
            typesetting industry. Lorem Ipsum has been the industry's 
            standard dummy text ever since the
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <p className="text-gray-700">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
          has been the industry's standard dummy text ever since the Lorem Ipsum is simply dummy 
          text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
          standard dummy text ever since the
        </p>
      </div>
      
      <div>
        <h2 className="text-xl font-bold mb-6 text-black">Contact us</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          <a href="https://linkedin.com/in/TrustFund" className="flex items-center gap-2 text-blue-700 hover:underline">
            <img src={LinkedIn} alt="LinkedIn" className="w-6 h-6" />
            <span>in/TrustFund</span>
          </a>
          
          <a href="https://twitter.com/TrustFund" className="flex items-center gap-2 text-blue-400 hover:underline">
            <img src={TwitterX} alt="Twitter" className="w-6 h-6" />
            <span>x/TrustFund</span>
          </a>
          
          <a href="https://facebook.com/TrustFund/Home" className="flex items-center gap-2 text-blue-800 hover:underline">
            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
            <span>fb/TrustFund</span>
          </a>
          
          <a href="https://instagram.com/TrustFund" className="flex items-center gap-2 text-pink-600 hover:underline">
            <img src={Instagram} alt="Instagram" className="w-6 h-6" />
            <span>ig/TrustFund</span>
          </a>
        </div>
      </div>
    </div>
  );
}