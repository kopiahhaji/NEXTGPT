import React, { useState } from 'react';
import { IconButton } from "@/app/components/button";
import { useSdStore } from "@/app/store/sd";
import { showToast } from "@/app/components/ui-lib";
import styles from "./sd-panel.module.scss";
import clsx from "clsx";

interface IslamicPrompt {
  key: string;
  title: string;
  prompt: string;
  category: 'prophet' | 'mosque' | 'quran' | 'islamic_art' | 'hajj';
}

const islamicPrompts: IslamicPrompt[] = [
  {
    key: 'prophet_adam',
    title: 'Prophet Adam (AS)',
    prompt: 'Prophet Adam (AS) in Paradise, Islamic miniature style, peaceful garden with flowing water, traditional Islamic art, golden light, serene atmosphere, detailed Arabic calligraphy background',
    category: 'prophet'
  },
  {
    key: 'prophet_noah',
    title: 'Prophet Noah (AS)',
    prompt: 'Prophet Noah (AS) building the ark during the great flood, Islamic geometric patterns, traditional Islamic illustration, stormy sky, wooden ark construction, divine protection',
    category: 'prophet'
  },
  {
    key: 'prophet_abraham',
    title: 'Prophet Abraham (AS)',
    prompt: 'Prophet Abraham (AS) facing celestial fire, Islamic calligraphy background, spiritual illumination, desert landscape, divine test, golden flames, peaceful expression',
    category: 'prophet'
  },
  {
    key: 'prophet_moses',
    title: 'Prophet Moses (AS)',
    prompt: 'Prophet Moses (AS) at Mount Sinai receiving divine revelation, Islamic desert landscape, burning bush, stone tablets, heavenly light, traditional Islamic art style',
    category: 'prophet'
  },
  {
    key: 'prophet_jesus',
    title: 'Prophet Jesus (AS)',
    prompt: 'Prophet Jesus (AS) with disciples in peaceful gathering, Islamic artistic style, olive trees, serene atmosphere, traditional Islamic miniature painting, spiritual teaching',
    category: 'prophet'
  },
  {
    key: 'prophet_muhammad',
    title: 'Prophet Muhammad (SAW)',
    prompt: 'Prophet Muhammad (SAW) in Medina, Islamic architectural setting, serene atmosphere, traditional Islamic art, mosque courtyard, peaceful leadership, divine guidance',
    category: 'prophet'
  },
  {
    key: 'quran_revelation',
    title: 'Quran Revelation',
    prompt: 'Angel Gabriel delivering Quran to Prophet Muhammad (SAW), Islamic miniature art, cave of Hira, divine light, spiritual moment, traditional Islamic illumination',
    category: 'quran'
  },
  {
    key: 'kaaba_hajj',
    title: 'Hajj Pilgrimage',
    prompt: 'Muslims performing Hajj around Kaaba, Islamic pilgrimage scene, tawaf ritual, Kaaba in center, traditional Islamic clothing, spiritual unity, Mecca landscape',
    category: 'hajj'
  },
  {
    key: 'mosque_architecture',
    title: 'Grand Mosque',
    prompt: 'Beautiful mosque architecture, Islamic geometric patterns, peaceful courtyard, minaret, dome, Arabic calligraphy, traditional Islamic design, serene atmosphere',
    category: 'mosque'
  },
  {
    key: 'islamic_garden',
    title: 'Islamic Paradise Garden',
    prompt: 'Islamic paradise garden, flowing water, Arabic calligraphy, peaceful retreat, lush greenery, fountains, traditional Islamic landscaping, spiritual tranquility',
    category: 'islamic_art'
  },
  {
    key: 'arabic_calligraphy',
    title: 'Islamic Calligraphy',
    prompt: 'Beautiful Arabic calligraphy of Quran verses, Islamic geometric borders, golden ink, traditional Islamic art, spiritual text, ornate design, sacred writing',
    category: 'islamic_art'
  },
  {
    key: 'islamic_miniature',
    title: 'Islamic Miniature Art',
    prompt: 'Islamic miniature painting, detailed illustration, traditional Persian style, ornate borders, historical Islamic scene, intricate patterns, cultural heritage',
    category: 'islamic_art'
  }
];

export function IslamicContentGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sdStore = useSdStore();

  const categories = [
    { key: 'all', label: 'All Themes' },
    { key: 'prophet', label: 'Prophet Stories' },
    { key: 'mosque', label: 'Mosque & Architecture' },
    { key: 'quran', label: 'Quran & Revelation' },
    { key: 'hajj', label: 'Hajj & Pilgrimage' },
    { key: 'islamic_art', label: 'Islamic Art' }
  ];

  const filteredPrompts = selectedCategory === 'all'
    ? islamicPrompts
    : islamicPrompts.filter(prompt => prompt.category === selectedCategory);

  const handleGenerateIslamicImage = (prompt: IslamicPrompt) => {
    // Set the prompt in the SD store
    sdStore.setCurrentParams({
      ...sdStore.currentParams,
      prompt: prompt.prompt,
      negative_prompt: 'blurry, low quality, modern clothing, western architecture, non-Islamic elements, inappropriate content',
      style: 'photographic',
      aspect_ratio: '16:9'
    });

    showToast(`Islamic image prompt set: ${prompt.title}`);
  };

  const handleRandomGenerate = () => {
    const randomPrompt = islamicPrompts[Math.floor(Math.random() * islamicPrompts.length)];
    handleGenerateIslamicImage(randomPrompt);
  };

  return (
    <div className={styles["islamic-generator"]}>
      <div className={styles["generator-header"]}>
        <h3>Islamic Themes</h3>
        <IconButton
          text="Auto Generate Islamic Content"
          type="primary"
          onClick={handleRandomGenerate}
          shadow
        />
      </div>

      <div className={styles["category-filter"]}>
        {categories.map(category => (
          <button
            key={category.key}
            className={clsx(styles["category-button"], {
              [styles["active"]]: selectedCategory === category.key
            })}
            onClick={() => setSelectedCategory(category.key)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className={styles["prompts-grid"]}>
        {filteredPrompts.map(prompt => (
          <div key={prompt.key} className={styles["prompt-card"]}>
            <div className={styles["prompt-title"]}>{prompt.title}</div>
            <div className={styles["prompt-preview"]}>
              {prompt.prompt.substring(0, 100)}...
            </div>
            <IconButton
              text="Generate"
              onClick={() => handleGenerateIslamicImage(prompt)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
