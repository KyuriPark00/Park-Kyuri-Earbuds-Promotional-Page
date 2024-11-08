(() => {
  // Variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  // Data
  const infoBoxes = [
    {
      title: "QuickCharge Boost", 
      text: "Fast-charging technology that provides hours of playback with just a few minutes of charging, keeping you connected with minimal downtime.", 
      image: "images/charging.png"
    },
    {
      title: "SoundCore Speaker",
      text: "High-fidelity audio driver that delivers clear, immersive sound quality with deep bass and crisp highs, ensuring a premium listening experience.",
      image: "images/speaker.png"
    },
    {
      title: "TouchFlow Control",
      text: "Single tap to play or pause music, double-tap to skip tracks, and press and hold to activate your voice assistant.",
      image: "images/touchpad.png"
    },
    {
      title: "VoiceBeam Mic",
      text: "A built-in microphone that captures your voice with clarity, reducing background noise for clear calls and voice commands.",
      image: "images/mic.png"
    }
  ];

  // Populate info boxes
  function loadInfo() {
    infoBoxes.forEach((infoBox, index) => {
      const selected = document.querySelector(`.Hotspot[slot="hotspot-${index + 1}"]`);
      if (selected) {
        const imageBox = document.createElement("img");
        imageBox.src = infoBox.image;
        imageBox.classList.add("hotspot-image");
        
        const titleBox = document.createElement("h3");
        titleBox.textContent = infoBox.title;
        titleBox.classList.add("hotspot-title");
  
        const textBox = document.createElement("p");
        textBox.textContent = infoBox.text;
        textBox.classList.add("hotspot-text");
  
        // Append title, image, and text to the annotation div
        const annotationDiv = selected.querySelector(".HotspotAnnotation");
        annotationDiv.innerHTML = ""; // Clear any existing content
        annotationDiv.append(titleBox, imageBox, textBox);
      }
    });
  }

  // Ensure info loads on page load
  loadInfo();

  // Show/Hide Info on Hover
  function showInfo() {
    const annotation = this.querySelector(".HotspotAnnotation");
    if (annotation) gsap.to(annotation, { autoAlpha: 1, duration: 0.5 });
  }

  function hideInfo() {
    const annotation = this.querySelector(".HotspotAnnotation");
    if (annotation) gsap.to(annotation, { autoAlpha: 0, duration: 0.5 });
  }

  // Add Event Listeners to Each Hotspot
  hotspots.forEach(hotspot => {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });
})();