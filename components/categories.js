"use client";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaUtensils, FaStar } from "react-icons/fa";

const categories = [
  { name: "pulao", image: "/pulao.jpg", path: "/pulao" },
  { name: "Beriyani", image: "/thali.jpg", path: "/beriyani" },
  { name: "Momo", image: "/momo.jpg", path: "/momo" },
  { name: "Desserts", image: "/deserts.jpg", path: "/desserts" },
];

const CategorySection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="py-10 px-4 bg-transparent"
      data-aos="fade-up"
      data-aos-offset="200"
      data-aos-once="true"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className={`
    flex items-center justify-center gap-3 
    text-3xl md:text-5xl font-extrabold mb-6 
    bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 
    bg-clip-text text-transparent 
    drop-shadow-[0_0_12px_rgba(255,215,0,0.9)]
  `}
          style={{
            WebkitTextStroke: "1px black", // black outline
          }}
        >
          <FaUtensils className="text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)] animate-pulse" />
          Explore Our Categories
          <FaStar className="text-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.9)] animate-pulse" />
        </h2>

        <div className="flex gap-6 overflow-x-auto px-2 mx-auto category-scroll justify-center">
          {categories.map((category, index) => (
            <Link key={index} href={category.path}>
              <motion.div
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 25px rgba(255, 255, 200, 0.9)",
                }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[130px] h-[130px] rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-in-out relative group overflow-hidden border border-yellow-200"
                style={{
                  boxShadow: "0 0 12px rgba(255, 255, 180, 0.6)",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Image */}
                <div className="w-full h-full relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-2xl group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 w-full text-center py-2 text-sm font-semibold tracking-wide text-yellow-200 drop-shadow-[0_0_6px_rgba(255,255,150,0.9)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  {category.name}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Hide scrollbar */
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
        .category-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;
