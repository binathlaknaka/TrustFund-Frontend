import React from 'react';
import { Helmet } from 'react-helmet-async';
import Facebook from '../assets/Facebook.png';
import Instagram from '../assets/Instagram.png';
import LinkedIn from '../assets/LinkedIn.png';
import TwitterX from '../assets/TwitterX.png';
import AboutImage from '../assets/aboutimage.jpg';
// import AboutImage from '../assets/TrustFundLogooo.png';

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-black">
      <Helmet>
        <title>About | TrustFund</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-12">Who We Are?</h1>

      <div className="flex flex-col md:flex-row items-center gap-10 mb-2 text-center">
        <div className="w-full md:w-1/2">
          <img
            src={AboutImage}
            alt="TrustFund visual"
            className=" w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">The TrustFund Community</h2>
          <p className="text-gray-900 leading-relaxed">
            TrustFund is a transparent, secure, and compassionate platform that connects donors
            with verified charitable organizations in real time. We believe in building trust,
            empowering communities, and making every donation count. Our mission is to support
            those in need while providing complete transparency through technology.
          </p>
        </div>
      </div>

      <div className="mb-16 text-gray-500 text-center max-w-3xl mx-auto leading-relaxed">
        <p>
          With a vision to create a future where generosity meets accountability, TrustFund was
          founded to streamline the donation process. Whether you're contributing to disaster
          relief, education, or environmental sustainability, we make sure your support reaches
          the right place. Join us in creating impact with integrity.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>

        <div className="flex justify-center flex-wrap gap-6">
          <a
            href="https://linkedin.com/in/TrustFund"
            className="flex items-center gap-2 text-blue-700 hover:underline"
          >
            <img src={LinkedIn} alt="LinkedIn" className="w-6 h-6" />
            <span>in/TrustFund</span>
          </a>

          <a
            href="https://twitter.com/TrustFund"
            className="flex items-center gap-2 text-blue-400 hover:underline"
          >
            <img src={TwitterX} alt="X/Twitter" className="w-6 h-6" />
            <span>x/TrustFund</span>
          </a>

          <a
            href="https://facebook.com/TrustFund/Home"
            className="flex items-center gap-2 text-blue-800 hover:underline"
          >
            <img src={Facebook} alt="Facebook" className="w-6 h-6" />
            <span>fb/TrustFund</span>
          </a>

          <a
            href="https://instagram.com/TrustFund"
            className="flex items-center gap-2 text-pink-600 hover:underline"
          >
            <img src={Instagram} alt="Instagram" className="w-6 h-6" />
            <span>ig/TrustFund</span>
          </a>
        </div>
      </div>
    </div>
  );
}
