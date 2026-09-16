// "use client";

// import React from "react";
// import Link from "next/link";
// import { Play } from "lucide-react";

// const darshans = [
//   { id: 1, title: "Bihari Ji Mandir" },
//   { id: 2, title: "Barshana Mandir" },
//   { id: 3, title: "Salasar Mandir" },
//   { id: 4, title: "Maha Kaleshwar Mandir" },
//   { id: 5, title: "Bihari Ji Live Darshan" },
//   { id: 6, title: "Bihari Ji Live Darshan" },
//   { id: 7, title: "Bihari Ji Live Darshan" },
//   { id: 8, title: "Bihari Ji Live Darshan" },
// ];

// export function LiveDarshanSection() {
//   return (
//     <section className="w-full bg-[#fdf8f0] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-[1300px] mx-auto flex flex-col items-center">
//         {/* Section Header */}
//         <div className="flex items-center gap-3 text-[#c87638] mb-2">
//           <div className="h-[1px] w-16 bg-[#c87638]"></div>
//           <span className="text-xs font-bold uppercase tracking-widest">
//             LIVE DARSHAN
//           </span>
//           <div className="h-[1px] w-16 bg-[#c87638]"></div>
//         </div>

//         <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-8 sm:mb-12 tracking-tight">
//           Witness the Divine in Real Time
//         </h2>

//         {/* 8 Mandir Cards Grid with Smooth Hover Animation */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-8 sm:mb-10">
//           {darshans.map((item) => (
//             <Link
//               key={item.id}
//               href="/live-darshan"
//               className="bg-[#edf2fc] rounded-2xl overflow-hidden border border-[#d5e1f7] shadow-xs hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col cursor-pointer"
//             >
//               {/* Mandir Image Container with Play Overlay */}
//               <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
//                 {/* Mandir Decorative Background Graphic */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent z-10"></div>
//                 <div
//                   className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-110 transition-transform duration-500"
//                   style={{
//                     backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop')`,
//                   }}
//                 ></div>

//                 {/* YouTube Red Play Button Badge with Glow Effect */}
//                 <div className="relative z-20 w-16 h-11 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 group-hover:shadow-red-500/50 transition-all duration-300">
//                   <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
//                 </div>
//               </div>

//               {/* Mandir Name Footer Bar */}
//               <div className="p-3.5 bg-[#edf2fc] border-t border-[#d5e1f7] flex items-center justify-start group-hover:bg-[#e2ebfc] transition-colors">
//                 <p className="font-bold text-sm text-[#1e293b] truncate group-hover:text-red-700 transition-colors">
//                   {item.title}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* View All Mandir Darshan Button */}
//         <Link
//           href="/live-darshan"
//           className="px-8 py-3 bg-[#163014] hover:bg-[#0e210d] hover:scale-105 active:scale-95 text-white font-bold text-sm rounded-full shadow-md transition-all duration-200"
//         >
//           View All Mandir Darshan &gt;
//         </Link>
//       </div>
//     </section>
//   );
// }




"use client";

import Link from "next/link";
import { Play } from "lucide-react";

const darshans = [
  { id: 1, title: "Bihari Ji Mandir" },
  { id: 2, title: "Barshana Mandir" },
  { id: 3, title: "Salasar Mandir" },
  { id: 4, title: "Maha Kaleshwar Mandir" },
  { id: 5, title: "Bihari Ji Live Darshan" },
  { id: 6, title: "Bihari Ji Live Darshan" },
  { id: 7, title: "Bihari Ji Live Darshan" },
  { id: 8, title: "Bihari Ji Live Darshan" },
];

export function LiveDarshanSection() {
  return (
    <section className="w-full bg-[#fdf8f0] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">
        <div className="flex items-center gap-3 text-[#c87638] mb-4">
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
          <span className="text-xs font-bold uppercase tracking-widest">
            LIVE DARSHAN
          </span>
          <div className="h-[1px] w-16 bg-[#c87638]"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#801c10] text-center mb-12 sm:mb-16 tracking-tight">
          Witness the Divine in Real Time
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full mb-10">
          {darshans.map((item) => (
            <Link
              key={item.id}
              href="/live-darshan"
              className="bg-[#edf2fc] rounded-2xl overflow-hidden border border-[#d5e1f7] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out group flex flex-col cursor-pointer"
            >
              <div className="relative h-48 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop')`,
                  }}
                ></div>

                <div className="relative z-20 w-16 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-red-500 group-hover:scale-110 transition-all duration-300">
                  <div className="absolute inset-0 rounded-xl bg-red-600 animate-ping opacity-0 group-hover:opacity-30 duration-1000"></div>
                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                </div>
              </div>

              <div className="p-4 bg-[#edf2fc] border-t border-[#d5e1f7] flex items-center justify-start group-hover:bg-[#e2ebfc] transition-colors duration-300">
                <p className="font-bold text-[15px] text-[#1e293b] truncate group-hover:text-red-700 transition-colors">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/live-darshan"
          className="px-8 py-3.5 bg-[#163014] hover:bg-[#0e210d] hover:scale-105 hover:shadow-xl active:scale-95 text-white font-bold text-sm rounded-full transition-all duration-300 ease-out"
        >
          View All Mandir Darshan &gt;
        </Link>
      </div>
    </section>
  );
}