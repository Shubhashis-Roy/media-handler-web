"use client";

import "../styles/landing.css";
import "../components/rotating-cards.module.css";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  ImageIcon,
  Eye,
  Users,
  Zap,
  Layers,
  Shield,
  ArrowRight,
} from "lucide-react";
import RotatingCards from "./RotatingCards";
import WhyCreatorsLoveUs from "./WhyCreatorsLoveUs";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="bg-[--color-bg] text-[--color-text] bg-gradient-to-br from-[--color-bg] to-[--color-surface-muted]">
      {/* -------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* -------------------------------------------------- */}

      <section className="relative min-h-screen flex items-center px-6 md:px-16 py-32 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video"
        >
          <source src="/landing-hero-video.mp4" type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl text-left fade-in-up"
        >
          <h1 className="hero-heading text-4xl md:text-7xl font-saira leading-tight drop-shadow-xl">
            <span className=" text-[--color-primary] premium-glow-soft">
              Master Your Media
            </span>{" "}
            <span className="font-pacifico text-[--color-primary] premium-glow-soft">
              Effortlessly
            </span>
          </h1>

          <p className="hero-subtitle text-lg md:text-2xl mt-6 max-w-xl text-[--color-text-muted]">
            A beautifully crafted platform that blends structure, creativity,
            and automation — built for creators who demand elegance.
          </p>

          <div className="mt-12 flex gap-6">
            <Link href="/dashboard">
              <button className="btn-primary premium-btn text-lg px-10 py-4 rounded-xl shadow-xl">
                Explore Demo
              </button>
            </Link>

            <Link href="/login">
              <button className="btn-outline text-lg px-10 py-4 rounded-xl premium-outline">
                Login
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-28 px-6 feature-section-bg">
        <motion.h2
          className="section-title text-center text-4xl font-saira fade-in-up"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          What Makes Us{" "}
          <span className="font-pacifico text-[--color-primary]">
            Different
          </span>
        </motion.h2>

        <motion.p
          className="section-sub text-center text-[--color-text-muted] mt-6 max-w-2xl mx-auto fade-in-up"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          Crafted with an obsession for detail — blending minimal design with
          powerful automation.
        </motion.p>

        {/* Rotating 3D Cards Section */}
        <div className="max-w-7xl mx-auto mt-10 flex items-center justify-center py-10">
          <RotatingCards />
        </div>
      </section>

      <section className="howit-section py-28 px-6">
        <h2 className="text-center text-4xl font-saira fade-in-up">
          How It{" "}
          <span className="font-pacifico text-[--color-primary]">Works</span>
        </h2>

        <p className="section-sub text-center text-[--color-text-muted] max-w-2xl mx-auto mt-4 fade-in-up">
          A beautifully simple 3-step flow — designed for creators who value
          clarity, structure and speed.
        </p>

        <div className="howit-wrapper max-w-6xl mx-auto mt-24 relative">
          <div className="howit-line"></div>

          <div className="grid md:grid-cols-3 gap-20 relative z-10">
            {[
              {
                step: "1",
                title: "Upload Your Media",
                desc: "Import and store all your content inside one secure cloud library.",
              },
              {
                step: "2",
                title: "Organize & Plan",
                desc: "Tag, arrange and visually plan your upcoming posts with ease.",
              },
              {
                step: "3",
                title: "Publish & Track",
                desc: "Publish anywhere instantly and track real-time analytics.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="howit-card"
              >
                <div className="howit-step-circle">
                  <span>{item.step}</span>
                </div>

                <h3 className="howit-title">{item.title}</h3>
                <p className="howit-desc">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WhyCreatorsLoveUs />

      <section className="py-28 px-6 bg-[--color-surface-muted]">
        <h2 className="text-center text-4xl font-saira mb-10">
          A Glimpse Into{" "}
          <span className="font-pacifico text-[--color-primary]">
            Your Workspace
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Light Theme Image */}
          <img
            src="/light.png"
            className="rounded-2xl premium-image block dark:hidden"
            alt="Dashboard preview light"
          />

          {/* Dark Theme Image */}
          <img
            src="/dark.png"
            className="rounded-2xl premium-image hidden dark:block"
            alt="Dashboard preview dark"
          />
        </motion.div>
      </section>

      {/* -------------------------------------------------- */}
      {/* CALL TO ACTION */}
      {/* -------------------------------------------------- */}

      <section className="py-36 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-saira font-bold max-w-3xl mx-auto fade-in-up">
          Ready to{" "}
          <span className="font-pacifico text-[--color-primary] premium-glow-soft">
            Elevate Your Media Workflow?
          </span>
        </h2>

        <p className="text-lg text-[--color-text-muted] max-w-xl mx-auto mt-4 fade-in-up">
          Start organizing smarter, collaborating better, and publishing faster.
        </p>

        <Link href="/signup">
          <button className="btn-primary premium-btn mt-10 px-12 py-4 text-xl rounded-xl flex items-center gap-2 mx-auto shadow-xl">
            Get Started <ArrowRight className="w-6 h-6" />
          </button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}
