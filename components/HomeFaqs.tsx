"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export default function HomeFaqs({ items }: { items: FaqItem[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openFaq === index;

        return (
          <div
            key={faq.q}
            className="border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : index)}
              className="w-full p-6 sm:p-8 md:p-10 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter uppercase italic pr-4">
                {faq.q}
              </span>
              {isOpen ? (
                <Minus className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              ) : (
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
              )}
            </button>

            <div
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-6 sm:px-10 pb-8 sm:pb-10 text-gray-400 text-base sm:text-lg leading-relaxed font-medium">
                  {faq.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
