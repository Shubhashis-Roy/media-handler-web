"use client";

import { motion } from "framer-motion";
import { Zap, Layers, Shield } from "lucide-react";
import "../styles/landing.css";

export default function GlassFeatureCards() {
  const features = [
    {
      icon: Zap,
      title: "Fast & Efficient",
      desc: "Upload, organize and schedule your content in seconds. Built for creators who value speed.",
      r: -12,
      tilt: -6,
    },
    {
      icon: Layers,
      title: "All-In-One Hub",
      desc: "A unified workspace for planning, editing, collaboration and publishing — all in one place.",
      r: 0,
      tilt: 0,
    },
    {
      icon: Shield,
      title: "Secure by Design",
      desc: "Enterprise-grade encryption & privacy layers keep your content protected at every stage.",
      r: 12,
      tilt: 6,
    },
  ];

  return (
    <section className="feature-section-bg py-28 px-6">
      {/* Title */}
      <h2 className="text-center text-4xl font-saira fade-in-up mb-3">
        Why Creators{" "}
        <span className="font-pacifico text-[--color-primary]">Love Us</span>
      </h2>

      {/* Subtitle */}
      <p className="text-center text-[--color-text-muted] max-w-2xl mx-auto mb-16 fade-in-up">
        Crafted for modern storytellers — giving you speed, clarity, and a
        beautifully unified workflow powered by automation.
      </p>

      {/* STACKED GLASS CARDS */}
      <div className="glass-stack-container mb-16">
        {features.map((item, i) => {
          const style: React.CSSProperties & {
            [key: string]: string | number;
          } = {
            "--r": item.r,
            "--tilt": item.tilt,
          };

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="glass-stack-card"
              style={style}
            >
              {/* Card content */}
              <div className="stack-content mt-4">
                <item.icon className="stack-icon" />
                <h3 className="stack-title">{item.title}</h3>
                <p className="stack-desc">{item.desc}</p>

                {/* Button */}
                <button className="explore-btn mt-6">Explore More →</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
