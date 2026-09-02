// "use client";

// import React from "react";
// import Link from "next/link";
// import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="w-full bg-[#fbd788] text-[#2d1a0e] pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 border-t border-[#e8be66]">
//       <div className="max-w-[1350px] mx-auto flex flex-col justify-between">

//         {/* Main 4 Columns Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10">

//           {/* Column 1: Brand Info (5 cols) */}
//           <div className="lg:col-span-5 space-y-4">
//             <Link href="/" className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-md relative overflow-hidden bg-[#131b3e]">
//                 <img 
//                   src="/images/astroyavi_logo.jpeg" 
//                   alt="Astroyavi Logo" 
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>
//               <span className="font-serif text-2xl font-bold tracking-tight text-[#2d1a0e]">
//                 Astroyavi
//               </span>
//             </Link>

//             <p className="text-xs sm:text-sm text-[#3c2415] leading-relaxed max-w-md font-sans">
//               Discover your future with personalized astrology insights, daily horoscopes, and expert guidance based on your birth chart. Get accurate predictions, zodiac updates, and spiritual solutions to make better life decisions.
//             </p>
//           </div>

//           {/* Column 2: PAGES (2 cols) */}
//           <div className="lg:col-span-2 space-y-3">
//             <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">PAGES</h3>
//             <ul className="space-y-2 text-xs font-medium text-[#3c2415]">
//               <li><Link href="/" className="hover:underline">Home page</Link></li>
//               <li><Link href="/wallet" className="hover:underline">Wallet</Link></li>
//               <li><Link href="/my-bookings" className="hover:underline">My Bookings</Link></li>
//               <li><Link href="/support" className="hover:underline">Support</Link></li>
//               <li><Link href="/terms" className="hover:underline">Terms of Services</Link></li>
//             </ul>
//           </div>

//           {/* Column 3: SERVICES (2 cols) */}
//           <div className="lg:col-span-2 space-y-3">
//             <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">SERVICES</h3>
//             <ul className="space-y-2 text-xs font-medium text-[#3c2415]">
//               <li><Link href="/horoscope" className="hover:underline">Daily Horoscope</Link></li>
//               <li><Link href="/panchang" className="hover:underline">Panchang</Link></li>
//               <li><Link href="/puja-booking" className="hover:underline">Puja Booking</Link></li>
//               <li><Link href="/match-making" className="hover:underline">Match Making</Link></li>
//               <li><Link href="/kundli" className="hover:underline">Kundli</Link></li>
//               <li><Link href="/remedies" className="hover:underline">Remedies</Link></li>
//             </ul>
//           </div>

//           {/* Column 4: DOWNLOAD APP & SOCIAL MEDIA (3 cols) */}
//           <div className="lg:col-span-3 space-y-6">

//             {/* Download App */}
//             <div className="space-y-2">
//               <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">DOWNLOAD APP</h3>
//               <a 
//                 href="#"
//                 className="inline-flex items-center gap-3 bg-black text-white px-4 py-2 rounded-xl shadow-md hover:bg-slate-900 transition-all"
//               >
//                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
//                   <path d="M3.6 1.8L13.8 12 3.6 22.2C3.2 21.8 3 21.2 3 20.4V3.6C3 2.8 3.2 2.2 3.6 1.8ZM15.2 13.4L18.4 16.6L4.8 23.4L15.2 13.4ZM18.4 7.4L15.2 10.6L4.8 .6L18.4 7.4ZM16.6 12L20.4 9.8C21.2 9.4 21.2 8.6 20.4 8.2L16.6 6V18Z" />
//                 </svg>
//                 <div className="text-left leading-none">
//                   <span className="text-[9px] uppercase tracking-wider block opacity-80">GET IT ON</span>
//                   <span className="text-sm font-bold block">Google Play</span>
//                 </div>
//               </a>
//             </div>

//             {/* Social Media */}
//             <div className="space-y-2">
//               <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">SOCIAL MEDIA</h3>
//               <div className="flex items-center gap-3">
//                 <a href="#" className="w-9 h-9 rounded-full bg-white text-[#2d1a0e] flex items-center justify-center shadow-xs hover:bg-[#2d1a0e] hover:text-white transition-all">
//                   <Facebook className="w-4 h-4" />
//                 </a>
//                 <a href="#" className="w-9 h-9 rounded-full bg-white text-[#2d1a0e] flex items-center justify-center shadow-xs hover:bg-[#2d1a0e] hover:text-white transition-all">
//                   <Twitter className="w-4 h-4" />
//                 </a>
//                 <a href="#" className="w-9 h-9 rounded-full bg-white text-[#2d1a0e] flex items-center justify-center shadow-xs hover:bg-[#2d1a0e] hover:text-white transition-all">
//                   <Linkedin className="w-4 h-4" />
//                 </a>
//                 <a href="#" className="w-9 h-9 rounded-full bg-white text-[#2d1a0e] flex items-center justify-center shadow-xs hover:bg-[#2d1a0e] hover:text-white transition-all">
//                   <Instagram className="w-4 h-4" />
//                 </a>
//               </div>
//             </div>

//           </div>

//         </div>

//         {/* Bottom Divider Line & Copyright Text */}
//         <div className="border-t border-[#e8be66] pt-4 text-center text-xs text-[#4a3020]">
//           <p>© Copyrights 2026 All Rights Reserved Privacy</p>
//         </div>

//       </div>
//     </footer>
//   );
// }





"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#fbd788] text-[#2d1a0e] pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-12 border-t border-[#e8be66]">
      <div className="max-w-[1350px] mx-auto flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-8 sm:pb-10">

          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] flex items-center justify-center shadow-md relative overflow-hidden bg-[#131b3e] group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/astroyavi_logo.jpeg"
                  alt="Astroyavi Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2d1a0e]">
                Astroyavi
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-[#3c2415] leading-relaxed max-w-md font-sans">
              Discover your future with personalized astrology insights, daily horoscopes, and expert guidance based on your birth chart. Get accurate predictions, zodiac updates, and spiritual solutions to make better life decisions.
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">PAGES</h3>
            <ul className="space-y-3 text-xs font-medium text-[#3c2415]">
              {['Home page', 'Wallet', 'My Bookings', 'Support', 'Terms of Services'].map((item, i) => (
                <li key={i}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#c85a17] transition-colors duration-200 relative group inline-block">
                    {item}
                    <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">SERVICES</h3>
            <ul className="space-y-3 text-xs font-medium text-[#3c2415]">
              {['Daily Horoscope', 'Panchang', 'Puja Booking', 'Match Making', 'Kundli', 'Remedies'].map((item, i) => (
                <li key={i}>
                  <Link href={`/${item.toLowerCase().replace(/ /g, '-')}`} className="hover:text-[#c85a17] transition-colors duration-200 relative group inline-block">
                    {item}
                    <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-[#c85a17] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">DOWNLOAD APP</h3>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-slate-800 hover:-translate-y-1 transition-all duration-300 group"
              >
                <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <path d="M3.6 1.8L13.8 12 3.6 22.2C3.2 21.8 3 21.2 3 20.4V3.6C3 2.8 3.2 2.2 3.6 1.8ZM15.2 13.4L18.4 16.6L4.8 23.4L15.2 13.4ZM18.4 7.4L15.2 10.6L4.8 .6L18.4 7.4ZM16.6 12L20.4 9.8C21.2 9.4 21.2 8.6 20.4 8.2L16.6 6V18Z" />
                </svg>
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase tracking-wider block opacity-80">GET IT ON</span>
                  <span className="text-sm font-bold block">Google Play</span>
                </div>
              </a>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#2d1a0e]">SOCIAL MEDIA</h3>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white text-[#2d1a0e] flex items-center justify-center shadow-sm hover:shadow-md hover:bg-[#2d1a0e] hover:text-white hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e8be66] pt-5 text-center text-xs font-medium text-[#4a3020]">
          <p>© Copyrights 2026 Astroyavi. All Rights Reserved Privacy</p>
        </div>
      </div>
    </footer>
  );
}