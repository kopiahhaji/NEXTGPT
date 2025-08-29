"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./home.module.scss";
import { useAppConfig, useChatStore } from "../store";

import { IconButton } from "./button";

import SettingsIcon from "../icons/settings.svg";
import AddIcon from "../icons/add.svg";
import BookOpenIcon from "../icons/bot.svg";
import ChatGptIcon from "../icons/chatgpt.svg";

import { Path } from "../constant";

import Locale from "../locales";

export function SeniorSideBar(props: { className?: string }) {
  const chatStore = useChatStore();
  const navigate = useNavigate();
  const config = useAppConfig();

  const [showSidebar, setShowSidebar] = useState(true);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleNewChat = () => {
    chatStore.newSession();
    navigate(Path.Chat);
  };

  return (
    <div
      className={`${styles.sidebar} ${props.className || ""} ${
        showSidebar ? styles["sidebar-show"] : ""
      }`}
      style={{
        width: config.sidebarWidth,
      }}
    >
      <div className={styles["sidebar-header"]}>
        <div className={styles["sidebar-title-container"]}>
          <div className={styles["sidebar-title"]}>
            <BookOpenIcon />
            <span>Ustaz AI - Senior</span>
          </div>
          <div className={styles["sidebar-sub-title"]}>
            Advanced Islamic Scholarship
          </div>
        </div>
        <div className={styles["sidebar-logo"]}>
          <ChatGptIcon />
        </div>
      </div>

      <div className={styles["sidebar-body"]}>
        {/* Chat sessions will be displayed here */}
        <div className={styles["chat-list"]}>
          {/* This will be populated with chat sessions */}
        </div>
      </div>

      <div className={styles["sidebar-tail"]}>
        <div className={styles["sidebar-actions"]}>
          <IconButton
            icon={<SettingsIcon />}
            text={Locale.Settings.Title}
            onClick={() => handleNavigation(Path.Settings)}
          />
        </div>
        <div className={styles["sidebar-actions"]}>
          <IconButton
            icon={<AddIcon />}
            text={Locale.Home.NewChat}
            onClick={handleNewChat}
            shadow
          />
        </div>
      </div>
    </div>
  );
}