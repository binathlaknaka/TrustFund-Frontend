const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#3276A6E5' }} class="w-full p-4 fixed bottom-0 left-0 right-0">
      <div class="container mx-auto flex justify-center items-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF0000" />
        </svg>
        <span class="ml-1 text-black">TrustFund Community</span>
      </div>
      
      {/* Back to Top Button */}
      <div class="fixed bottom-16 right-4">
        <a href="#top" style={{ backgroundColor: '#3276A6E5' }} class="text-white rounded-full p-3 flex items-center justify-center shadow-lg">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;



// import React from 'react'
// import { FooterData } from '../assets/assets'
// import { assets } from '../assets/assets';

// const Footer = () => {
//   return (
//     <div>
//         <footer >
//             <div className='bg-blue-950'>
//                 <div className='grid grid-cols-1 md:grid-cols-3  gap-8 mx-4 sm:mx-[10%] '>
//                     <div className='py-7'>
//                         <h2 className='text-lg font-bold mb-4 text-primary'>
//                             About us
//                         </h2>
//                         <p className='text-gray-300 pb-5'>
//                             Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, explicabo. Quidem ea necessitatibus ratione id!
//                         </p>
//                         <img className='w-44 cursor-pointer' src={assets.logo} alt='logo' />
//                     </div>
//                     <div className='px-20 py-7'>
//                         <h2 className='text-lg font-bold mb-4 text-primary'>
//                             Quick Links
//                         </h2>
//                         <ul>
//                             <li className='py-1'>
//                                 <a href="/" className='hover:text-gray-200 text-gray-400'>Home</a>
//                             </li>
//                             <li className='py-1'>
//                                 <a href="/category" className='hover:text-gray-200 text-gray-400'>Category</a>
//                             </li>
//                             <li className='py-1'>
//                                 <a href="/gallery" className='hover:text-gray-200 text-gray-400'>Gallery</a>
//                             </li>
//                             <li className='py-1'>
//                                 <a href="/about" className='hover:text-gray-200 text-gray-400'>About</a>
//                             </li>
//                             <li className='py-1'>
//                                 <a href="/feedback" className='hover:text-gray-200 text-gray-400'>Feedback</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div className='px-20 py-7'>
//                         <h2 className='text-lg font-bold mb-4 text-primary'>
//                             Follow Us
//                         </h2>
//                         <ul className='flex space-x-10 '>
//                             {FooterData.map((item, index) => (
//                                 <li key={index}>
//                                     <a href={item.link} target="_blank" rel="noopener noreferrer">
//                                         <item.icon className='text-gray-400 w-6 h-6 hover:text-gray-200'/>
//                                     </a>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//                 <div className='text-primary text-center py-5 border-t border-gray-400 gap-8 mx-4 sm:mx-[10%]'>
//                     <p> ♥ TrustFund Community</p>
//                 </div>
//             </div>
//         </footer>
//     </div>
//   );
// };

// export default Footer;