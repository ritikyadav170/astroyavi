



"use client";


import { UserCheck, CalendarDays, MessageSquare, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "1",
    title: "Choose a Service",
    description: "Select from consult, puja, kundli, panchang and more.",
    icon: <UserCheck className="w-10 h-10 text-[#163014]" />,
  },
  {
    step: "2",
    title: "Connect Instantly",
    description: "Consult experts or book services in just a few taps.",
    icon: <CalendarDays className="w-10 h-10 text-[#163014]" />,
  },
  {
    step: "3",
    title: "Get Guidance",
    description: "Receive accurate solutions and remedies.",
    icon: <MessageSquare className="w-10 h-10 text-[#163014]" />,
  },
  {
    step: "4",
    title: "Transform Your Life",
    description: "Experience peace, clarity and positive change.",
    icon: (
      <svg className="w-10 h-10 text-[#163014]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2c3 5 3 9 0 14-3-5-3-9 0-14z" />
        <path d="M12 16c5-2 9 0 10 4-4 1-8-1-10-4z" />
        <path d="M12 16c-5-2-9 0-10 4 4 1 8-1 10-4z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section className="w-full bg-[#163014] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">

        <div className="flex items-center gap-3 text-emerald-200/80 mb-4 animate-in fade-in duration-700">
          <div className="h-[1px] w-16 bg-emerald-200/40"></div>
          <span className="text-xs font-bold uppercase tracking-widest">HOW IT WORKS</span>
          <div className="h-[1px] w-16 bg-emerald-200/40"></div>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-16 lg:mb-20 tracking-tight animate-in slide-in-from-bottom-4 fade-in duration-700">
          Simple Steps to Get Divine Guidance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 w-full relative">
          {steps.map((item, index) => (
            <div key={item.step} className="flex flex-col items-center text-center relative group">

              <div className="relative mb-8">
                <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-white text-[#163014] font-bold text-sm flex items-center justify-center border-4 border-[#163014] shadow-md z-10 group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>

                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out">
                  <div className="group-hover:scale-110 transition-transform duration-500 ease-out">
                    {item.icon}
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-emerald-100/70 text-sm leading-relaxed max-w-[220px]">
                {item.description}
              </p>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-6 translate-x-1/2 text-emerald-200/30 group-hover:text-emerald-300 group-hover:translate-x-3 transition-all duration-500">
                  <ArrowRight className="w-8 h-8 animate-pulse" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}