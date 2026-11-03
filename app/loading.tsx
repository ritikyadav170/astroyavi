
import Image from "next/image";
import brandLogo from "../assets/brand-logo";

const LoadingPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#fdf8f0] text-slate-900 transition-opacity duration-200">
      <div className="flex flex-col items-center gap-5">
        <Image
          src={brandLogo}
          alt="Astroyavi — Your Stars. Your Journey."
          priority
          className="h-auto w-56 rounded-xl bg-white shadow-sm ring-1 ring-amber-900/10"
        />
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#c85a17] border-t-transparent" />
      </div>
    </main>
  );
};

export default LoadingPage;
