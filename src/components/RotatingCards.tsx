"use client";

import React, { useState } from "react";
import styles from "./rotating-cards.module.css";

const cssVar = (name: string, value: string | number): React.CSSProperties =>
  ({ [name]: value } as React.CSSProperties);

export default function RotatingCards() {
  const [isPaused, setIsPaused] = useState(false);

  const items = [
    {
      color: "142, 249, 252",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
      title: "Idea Studio",
      desc: "Generate fresh concepts & AI-crafted inspirations.",
    },
    {
      color: "142, 252, 157",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      title: "Visual Story",
      desc: "Transform raw shots into scroll-stopping visuals.",
    },
    {
      color: "252, 252, 142",
      img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800",
      title: "Smart Editing",
      desc: "Retouch, refine, and enhance before publishing.",
    },
    {
      color: "252, 208, 142",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
      title: "Auto Publishing",
      desc: "Schedule posts across platforms with perfect timing.",
    },
    {
      color: "252, 142, 239",
      img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800",
      title: "Flow Mode",
      desc: "Plan, organize & manage your content pipeline.",
    },
    {
      color: "142, 202, 252",
      img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
      title: "Media Vault",
      desc: "Store, categorize & reuse your best creations.",
    },
  ];

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.inner} ${isPaused ? styles.paused : ""}`}
        style={cssVar("--quantity", items.length)}
      >
        {items.map((item, i) => {
          const cardVars: React.CSSProperties = {
            ...cssVar("--index", i),
            ...cssVar("--color-card", item.color),
          };

          return (
            <div
              key={i}
              className={styles.card}
              style={cardVars}
              onMouseDown={pause}
              onMouseUp={resume}
              onMouseLeave={resume}
              onTouchStart={pause}
              onTouchEnd={resume}
            >
              <div
                className={styles.img}
                style={{
                  backgroundImage: `url(${item.img})`,
                }}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
