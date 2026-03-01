import React, { useEffect } from "react";

export function RemixARScene({ world, onObjectTap }) {
  useEffect(() => {
    // Setup AR.js/Three.js scene for selected world
    // For MVP, use A-Frame + AR.js markers and simple objects
    // Replace with real assets for production
    const scene = document.createElement("a-scene");
    scene.setAttribute("embedded", "true");
    scene.setAttribute("arjs", "sourceType: webcam; debugUIEnabled: false");
    scene.style.width = "100vw";
    scene.style.height = "100vh";
    scene.style.position = "absolute";
    scene.style.top = "0";
    scene.style.left = "0";
    scene.style.zIndex = "1";
    scene.id = "remix-ar-scene";
    // Remove previous scene
    const prev = document.getElementById("remix-ar-scene");
    if (prev) prev.remove();
    document.body.appendChild(scene);
    // Add AR objects for the world
    let color, obj;
    if (world === "cyberpunk") {
      color = "#00eaff";
      obj = "box";
    } else if (world === "ancient") {
      color = "#ffd600";
      obj = "sphere";
    } else {
      color = "#00bcd4";
      obj = "cylinder";
    }
    for (let i = 0; i < 3; i++) {
      const marker = document.createElement("a-marker");
      marker.setAttribute("preset", "hiro");
      const entity = document.createElement(`a-${obj}`);
      entity.setAttribute("color", color);
      entity.setAttribute("position", `${i * 0.5} 0 0`);
      entity.setAttribute("scale", "0.5 0.5 0.5");
      entity.addEventListener("click", () => onObjectTap());
      marker.appendChild(entity);
      scene.appendChild(marker);
    }
    return () => {
      if (scene) scene.remove();
    };
  }, [world, onObjectTap]);
  return null;
}
