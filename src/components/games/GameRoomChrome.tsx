
"use client";

import { useEffect, useState } from "react";
import GameRoomHeader from "@/components/games/GameRoomHeader";
import GameRoomFooter from "@/components/games/GameRoomFooter";

interface GameRoomChromeProps {
  title: string;
  vibe: string;
  category: string;
  image?: string;
  footerOnly?: boolean;
}

export default function GameRoomChrome({
  title,
  vibe,
  category,
  image,
  footerOnly = false,
}: GameRoomChromeProps) {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    setSessionActive(new URLSearchParams(window.location.search).get("session") === "1");
  }, []);

  if (footerOnly) {
    return <GameRoomFooter title={title} sessionActive={sessionActive} />;
  }

  return (
    <GameRoomHeader
      title={title}
      vibe={vibe}
      category={category}
      sessionActive={sessionActive}
      image={image}
    />
  );
}
