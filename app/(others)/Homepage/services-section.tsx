// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ArrowRight, Star, User, ShieldCheck } from "lucide-react";
// import { LoginDialog } from "./LoginDialog";

// interface ServiceItem {
//   id: string;
//   title: string;
//   description: string;
//   link: string;
//   isFree: boolean; // Live Darshan, Panchang, Kundli are free!
//   icon: React.ReactNode;
// }

// const services: ServiceItem[] = [
//   {
//     id: "pooja-booking",
//     title: "Pooja Booking",
//     description: "Book authentic pujas performed by pandits",
//     link: "/puja-booking",
//     isFree: false, // Requires login
//     icon: (
//       <svg
//         className="w-16 h-16 text-[#2b1810]"
//         viewBox="0 0 48 48"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <path d="M12 24h24v16H12z" />
//         <path d="M10 24c0-4 6-6 14-6s14 2 14 6" />
//         <path d="M24 6c2 3 1 6-2 8 4 0 6-3 4-8z" fill="#c85a17" opacity="0.4" />
//         <circle cx="16" cy="32" r="2" fill="currentColor" />
//         <circle cx="24" cy="32" r="2" fill="currentColor" />
//         <circle cx="32" cy="32" r="2" fill="currentColor" />
//       </svg>
//     ),
//   },
//   {
//     id: "match-making",
//     title: "Match Making",
//     description: "Find the perfect match with kundli matching",
//     link: "/match-making",
//     isFree: false, // Requires login
//     icon: (
//       <svg
//         className="w-16 h-16 text-[#2b1810]"
//         viewBox="0 0 48 48"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <circle cx="18" cy="20" r="8" />
//         <circle cx="30" cy="20" r="8" />
//         <path d="M18 28v12M14 34h8M30 28v12M26 34h8" />
//         <path d="M24 16l2 2 4-4" stroke="#c85a17" strokeWidth="2" />
//       </svg>
//     ),
//   },
//   {
//     id: "horoscope",
//     title: "Horoscope",
//     description: "Discover what the stars have planned today.",
//     link: "/horoscope",
//     isFree: false, // Requires login
//     icon: (
//       <svg
//         className="w-16 h-16 text-[#2b1810]"
//         viewBox="0 0 48 48"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <circle cx="24" cy="24" r="18" />
//         <circle cx="24" cy="24" r="10" strokeDasharray="3 3" />
//         <path
//           d="M24 6v36M6 24h36M11 11l26 26M11 37L37 11"
//           strokeWidth="1"
//           opacity="0.5"
//         />
//         <circle cx="24" cy="24" r="4" fill="#c85a17" />
//       </svg>
//     ),
//   },
//   {
//     id: "live-darshan",
//     title: "Live Darshan",
//     description: "Experience divine blessing through live temple darshan.",
//     link: "/live-darshan",
//     isFree: true, // FREE - Direct access without login!
//     icon: (
//       <svg
//         className="w-16 h-16 text-[#2b1810]"
//         viewBox="0 0 48 48"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <path d="M24 8l16 12v20H8V20z" />
//         <path d="M24 4v4M24 8L12 18M24 8l12 10" />
//         <polygon
//           points="24,20 18,30 30,30"
//           strokeWidth="1.5"
//           fill="#c85a17"
//           opacity="0.3"
//         />
//         <path d="M20 40v-8a4 4 0 0 1 8 0v8" />
//       </svg>
//     ),
//   },
//   {
//     id: "panchang",
//     title: "Panchang",
//     description: "Check daily panchang tithi, muhurat & more.",
//     link: "/panchang",
//     isFree: true, // FREE - Direct access without login!
//     icon: (
//       <svg
//         className="w-16 h-16 text-[#2b1810]"
//         viewBox="0 0 48 48"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <circle cx="24" cy="24" r="16" />
//         <path d="M24 16v16M16 24h16" />
//         <path
//           d="M16 16v8M32 24v8M24 32h8M16 24h8"
//           strokeWidth="2"
//           strokeLinecap="square"
//         />
//       </svg>
//     ),
//   },
//   {
//     id: "kundli",
//     title: "Kundli",
//     description: "Generate your detailed kundli in seconds.",
//     link: "/kundli",
//     isFree: true, // FREE - Direct access without login!
//     icon: (
//       <svg
//         className="w-16 h-16 text-[#2b1810]"
//         viewBox="0 0 48 48"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//       >
//         <rect x="10" y="8" width="28" height="32" rx="2" />
//         <path d="M18 18v12M14 24h12M14 18h6M18 24h6" strokeWidth="2" />
//         <line x1="14" y1="34" x2="34" y2="34" />
//       </svg>
//     ),
//   },
// ];

// export function ServicesSection() {
//   const router = useRouter();
//   const [selectedProtectedService, setSelectedProtectedService] =
//     useState<ServiceItem | null>(null);

//   const handleServiceClick = (item: ServiceItem) => {
//     if (item.isFree) {
//       // Free services go directly to page
//       router.push(item.link);
//     } else {
//       // Check if user is logged in
//       const userLoggedIn =
//         localStorage.getItem("astroyavi_logged_in") === "true";
//       if (userLoggedIn) {
//         router.push(item.link);
//       } else {
//         // Show Login Dialog popup
//         setSelectedProtectedService(item);
//       }
//     }
//   };

//   const handleLoginSuccess = () => {
//     localStorage.setItem("astroyavi_logged_in", "true");
//     if (selectedProtectedService) {
//       const link = selectedProtectedService.link;
//       setSelectedProtectedService(null);
//       router.push(link);
//     }
//   };

//   return (
//     <section className="w-full bg-[#fdf8f0] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-[1300px] mx-auto flex flex-col items-center">
//         {/* Section Header */}
//         <div className="flex items-center gap-3 text-[#c87638] mb-2">
//           <div className="h-[1px] w-16 bg-[#c87638]"></div>
//           <span className="text-xs font-bold uppercase tracking-widest">
//             OUR SERVICES
//           </span>
//           <div className="h-[1px] w-16 bg-[#c87638]"></div>
//         </div>

//         <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-8 sm:mb-12 tracking-tight">
//           All Your Spiritual Needs, One Trusted Platform
//         </h2>

//         {/* 6 Service Cards Grid with Smooth Hover Animation */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
//           {services.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => handleServiceClick(item)}
//               className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e6c896]/80 flex flex-col items-center text-center shadow-xs hover:shadow-2xl hover:border-[#c85a17] hover:-translate-y-2 transition-all duration-300 group relative cursor-pointer"
//             >
//               {/* FREE Badge for Free Services */}
//               {item.isFree && (
//                 <span className="absolute top-4 right-5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300 shadow-2xs">
//                   Free Service
//                 </span>
//               )}

//               {/* Service Icon with Smooth Scale & Rotate Animation */}
//               <div className="mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
//                 {item.icon}
//               </div>

//               {/* Title & Description */}
//               <h3 className="font-serif text-2xl font-bold text-[#2b1810] mb-2 group-hover:text-[#c85a17] transition-colors duration-200">
//                 {item.title}
//               </h3>
//               <p className="text-[#5c4033] text-sm leading-relaxed mb-8 max-w-[260px] flex-1">
//                 {item.description}
//               </p>

//               {/* Dark Green Circle Arrow Action Button with Scale Effect */}
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleServiceClick(item);
//                 }}
//                 className="w-12 h-12 rounded-full bg-[#1b4327] hover:bg-[#13321d] flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 cursor-pointer"
//                 aria-label={`Go to ${item.title}`}
//               >
//                 <ArrowRight className="w-5 h-5" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Bottom Metrics Pill Banner with Animated Hover Cards */}
//         <div className="w-full max-w-6xl bg-white border border-[#e6c896] rounded-2xl sm:rounded-full py-6 px-8 shadow-md mt-12 sm:mt-16 flex flex-wrap items-center justify-around gap-6">
//           <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-200">
//             <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-2xs">
//               <Star className="w-6 h-6 fill-amber-400" />
//             </div>
//             <div>
//               <p className="font-bold text-xl text-[#2b1810]">10K +</p>
//               <p className="text-xs font-semibold text-[#5c4033]">
//                 Happy Customers
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-200">
//             <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
//               <User className="w-6 h-6" />
//             </div>
//             <div>
//               <p className="font-bold text-xl text-[#2b1810]">500+</p>
//               <p className="text-xs font-semibold text-[#5c4033]">
//                 Expert Astrologers
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-200">
//             <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-2xs">
//               <span className="text-xl">🪔</span>
//             </div>
//             <div>
//               <p className="font-bold text-xl text-[#2b1810]">25K+</p>
//               <p className="text-xs font-semibold text-[#5c4033]">
//                 Pujas Performed
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-200">
//             <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-2xs">
//               <ShieldCheck className="w-6 h-6" />
//             </div>
//             <div>
//               <p className="font-bold text-xl text-[#2b1810]">100%</p>
//               <p className="text-xs font-semibold text-[#5c4033]">
//                 Secure &amp; Trusted
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Login Dialog Popup for Protected Services */}
//       <LoginDialog
//         isOpen={Boolean(selectedProtectedService)}
//         onClose={() => setSelectedProtectedService(null)}
//         onSuccess={handleLoginSuccess}
//         targetServiceTitle={selectedProtectedService?.title}
//       />
//     </section>
//   );
// }




"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Star, User, ShieldCheck } from "lucide-react";
import { LoginDialog } from "./LoginDialog";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  link: string;
  isFree: boolean;
  icon: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    id: "pooja-booking",
    title: "Pooja Booking",
    description: "Book authentic pujas performed by pandits",
    link: "/puja-booking",
    isFree: false,
    icon: (
      <svg className="w-16 h-16 text-[#2b1810]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 24h24v16H12z" />
        <path d="M10 24c0-4 6-6 14-6s14 2 14 6" />
        <path d="M24 6c2 3 1 6-2 8 4 0 6-3 4-8z" fill="#c85a17" opacity="0.4" />
        <circle cx="16" cy="32" r="2" fill="currentColor" />
        <circle cx="24" cy="32" r="2" fill="currentColor" />
        <circle cx="32" cy="32" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "match-making",
    title: "Match Making",
    description: "Find the perfect match with kundli matching",
    link: "/match-making",
    isFree: false,
    icon: (
      <svg className="w-16 h-16 text-[#2b1810]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="20" r="8" />
        <circle cx="30" cy="20" r="8" />
        <path d="M18 28v12M14 34h8M30 28v12M26 34h8" />
        <path d="M24 16l2 2 4-4" stroke="#c85a17" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "horoscope",
    title: "Horoscope",
    description: "Discover what the stars have planned today.",
    link: "/horoscope",
    isFree: false,
    icon: (
      <svg className="w-16 h-16 text-[#2b1810]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="10" strokeDasharray="3 3" />
        <path d="M24 6v36M6 24h36M11 11l26 26M11 37L37 11" strokeWidth="1" opacity="0.5" />
        <circle cx="24" cy="24" r="4" fill="#c85a17" />
      </svg>
    ),
  },
  {
    id: "live-darshan",
    title: "Live Darshan",
    description: "Experience divine blessing through live temple darshan.",
    link: "/live-darshan",
    isFree: true,
    icon: (
      <svg className="w-16 h-16 text-[#2b1810]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 8l16 12v20H8V20z" />
        <path d="M24 4v4M24 8L12 18M24 8l12 10" />
        <polygon points="24,20 18,30 30,30" strokeWidth="1.5" fill="#c85a17" opacity="0.3" />
        <path d="M20 40v-8a4 4 0 0 1 8 0v8" />
      </svg>
    ),
  },
  {
    id: "panchang",
    title: "Panchang",
    description: "Check daily panchang tithi, muhurat & more.",
    link: "/panchang",
    isFree: true,
    icon: (
      <svg className="w-16 h-16 text-[#2b1810]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="16" />
        <path d="M24 16v16M16 24h16" />
        <path d="M16 16v8M32 24v8M24 32h8M16 24h8" strokeWidth="2" strokeLinecap="square" />
      </svg>
    ),
  },
  {
    id: "kundli",
    title: "Kundli",
    description: "Generate your detailed kundli in seconds.",
    link: "/kundli",
    isFree: true,
    icon: (
      <svg className="w-16 h-16 text-[#2b1810]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="8" width="28" height="32" rx="2" />
        <path d="M18 18v12M14 24h12M14 18h6M18 24h6" strokeWidth="2" />
        <line x1="14" y1="34" x2="34" y2="34" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  const router = useRouter();
  const [selectedProtectedService, setSelectedProtectedService] = useState<ServiceItem | null>(null);

  const handleServiceClick = (item: ServiceItem) => {
    if (item.isFree) {
      router.push(item.link);
    } else {
      const userLoggedIn = localStorage.getItem("astroyavi_logged_in") === "true";
      if (userLoggedIn) {
        router.push(item.link);
      } else {
        setSelectedProtectedService(item);
      }
    }
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("astroyavi_logged_in", "true");
    if (selectedProtectedService) {
      const link = selectedProtectedService.link;
      setSelectedProtectedService(null);
      router.push(link);
    }
  };

  return (
    <section className="w-full bg-[#fdf8f0] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">

        <div className="flex items-center gap-3 text-[#c87638] mb-4">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">OUR SERVICES</span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-12 sm:mb-16 tracking-tight">
          All Your Spiritual Needs, One Trusted Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {services.map((item) => (
            <div
              key={item.id}
              onClick={() => handleServiceClick(item)}
              className="bg-white rounded-3xl p-8 border border-[#e6c896]/80 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-[#c85a17] hover:-translate-y-2 transition-all duration-500 ease-out group relative cursor-pointer"
            >
              {item.isFree && (
                <span className="absolute top-5 right-5 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 shadow-sm">
                  Free Service
                </span>
              )}

              <div className="mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 ease-out">
                {item.icon}
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#2b1810] mb-3 group-hover:text-[#c85a17] transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-[#5c4033] text-sm leading-relaxed mb-8 max-w-[260px] flex-1">
                {item.description}
              </p>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleServiceClick(item); }}
                className="w-12 h-12 rounded-full bg-[#1b4327] hover:bg-[#13321d] flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:shadow-lg group-hover:rotate-45 transition-all duration-500 cursor-pointer"
                aria-label={`Go to ${item.title}`}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl bg-white border border-[#e6c896] rounded-2xl sm:rounded-full py-8 px-8 shadow-lg shadow-amber-900/5 mt-16 sm:mt-20 flex flex-wrap items-center justify-around gap-8">
          <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 ease-out cursor-default">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-sm group-hover:bg-amber-100 transition-colors">
              <Star className="w-6 h-6 fill-amber-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="font-bold text-2xl text-[#2b1810]">10K+</p>
              <p className="text-xs font-semibold text-[#5c4033] uppercase tracking-wide">Happy Customers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 ease-out cursor-default">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm group-hover:bg-amber-100 transition-colors">
              <User className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="font-bold text-2xl text-[#2b1810]">500+</p>
              <p className="text-xs font-semibold text-[#5c4033] uppercase tracking-wide">Expert Astrologers</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 ease-out cursor-default">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shadow-sm group-hover:bg-amber-100 transition-colors">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300 block">🪔</span>
            </div>
            <div>
              <p className="font-bold text-2xl text-[#2b1810]">25K+</p>
              <p className="text-xs font-semibold text-[#5c4033] uppercase tracking-wide">Pujas Performed</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group hover:scale-105 transition-transform duration-300 ease-out cursor-default">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm group-hover:bg-amber-100 transition-colors">
              <ShieldCheck className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <p className="font-bold text-2xl text-[#2b1810]">100%</p>
              <p className="text-xs font-semibold text-[#5c4033] uppercase tracking-wide">Secure & Trusted</p>
            </div>
          </div>
        </div>
      </div>

      <LoginDialog isOpen={Boolean(selectedProtectedService)} onClose={() => setSelectedProtectedService(null)} onSuccess={handleLoginSuccess} targetServiceTitle={selectedProtectedService?.title} />
    </section>
  );
}