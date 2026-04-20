"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/SectionWrapper";

export default function BookCallPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("init", { origin: "https://cal.id" });
      cal("ui", {
        theme: "dark",
        styles: {
          branding: {
            brandColor: "#ffffff",
          },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <main className="bg-[#080808] min-h-screen text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-125 bg-linear-to-b from-white/3 to-transparent pointer-events-none" />
      <div className="fixed top-[10%] left-[10%] w-[30vw] h-[30vw] bg-white/2 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-white/2 rounded-full blur-[150px] pointer-events-none" />

      <SectionWrapper className="pt-28 md:pt-40 pb-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          
          <div className="text-center mb-20 xl:mb-28">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[7px] xl:text-[10px] 2xl:text-[13px] 3xl:text-[16px] uppercase tracking-[0.5em] text-white/30 font-bold mb-8 block"
            >
              Direct Access
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] xl:text-[7rem] 2xl:text-[8.5rem] 3xl:text-[10rem]
                       font-black uppercase tracking-tighter leading-[0.9] italic mb-10"
            >
              Book Your<br />Strategy Call.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] xl:text-[12px] 2xl:text-[15px] 3xl:text-[18px] uppercase tracking-[0.2em] text-white/35 leading-relaxed
                         max-w-2xl mx-auto font-medium"
            >
              Choose a time that works for you. This call will help identify growth
              bottlenecks and build scalable systems for your business.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-6xl relative group"
          >
            {/* Glass Glow effect behind the container */}
            <div className="absolute -inset-1 bg-linear-to-r from-white/10 to-transparent rounded-4xl blur-xl opacity-20 group-hover:opacity-30 transition duration-1000" />
            
            <div className="relative w-full min-h-150 lg:h-165 bg-white/3 backdrop-blur-3xl border border-white/10 rounded-4xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
              {/* Top accent line */}
              <div className="h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
              
              <Cal
                calLink="bhadrik-panchal-business-coach/interview"
                style={{ width: "100%", height: "100%", overflow: "hidden" }}
                config={{ theme: "dark", duration: "15" }}
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 xl:mt-32 w-full pt-16 border-t border-white/5"
          >
            <p className="text-[7px] xl:text-[10px] 2xl:text-[13px] 3xl:text-[16px] uppercase tracking-[0.4em] text-white/20 font-bold text-center">
              Trusted by 1000+ Entrepreneurs <span className="mx-8 opacity-20">|</span> 15+ Years Experience <span className="mx-8 opacity-20">|</span> Built 7-Figure Systems
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* FINAL CTA STYLE SPACING AT BOTTOM */}
      <div className="h-20" />
    </main>
  );
}