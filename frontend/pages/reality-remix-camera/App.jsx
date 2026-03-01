import React, { useState } from "react";
import { RemixARScene } from "./RemixARScene.js";

const WORLDS = [
  { name: "Cyberpunk City", id: "cyberpunk" },
  { name: "Ancient Empire", id: "ancient" },
  { name: "Underwater World", id: "underwater" }
];

export default function App() {
  const [world, setWorld] = useState(WORLDS[0].id);
  const [quest, setQuest] = useState("Find and tap 3 story objects!");
  const [collected, setCollected] = useState(0);

  function handleWorldChange(id) {
    setWorld(id);
    setQuest("Find and tap 3 story objects!");
    setCollected(0);
  }

  function handleObjectTap() {
    setCollected(c => c + 1);
    if (collected + 1 >= 3) setQuest("Quest complete! Export your remix video.");
  }

  function handleExport() {
    alert("Video export coming soon!");
  }

  function handleShare() {
    alert("Share to social media coming soon!");
  }

  return (
    <div>
      <div className="remix-header">Reality Remix Camera</div>
      <div className="remix-controls">
        {WORLDS.map(w => (
          <button
            key={w.id}
            className={world === w.id ? "selected" : ""}
            onClick={() => handleWorldChange(w.id)}
          >
            {w.name}
          </button>
        ))}
      </div>
      <RemixARScene world={world} onObjectTap={handleObjectTap} />
      <div className="remix-quest">
        {quest} <span style={{ fontWeight: "bold" }}>{collected}/3</span>
        {collected >= 3 && (
          <button onClick={handleExport} style={{ marginLeft: "1rem" }}>Export Video</button>
        )}
      </div>
      <div className="remix-share">
        <button onClick={handleShare}>Share</button>
      </div>
    </div>
  );
}
