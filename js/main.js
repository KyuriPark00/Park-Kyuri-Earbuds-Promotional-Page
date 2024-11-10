(() => {

  // Main Nav
  /*Menu*/
const toggleButton = document.querySelector(".toggle_button");
const toggleButtonIcon = document.querySelector(".toggle_button i");
const mobileMenu = document.querySelector("#mobile_dropdown_menu");


//parallax
const tl =gsap.timeline({
  scrollTrigger: {
    trigger: "#parallax-con",
    start:"top top",
    end:"bottom top",
    scrub: true
  }
});

gsap.utils.toArray(".parallax").forEach(layer => {
	const depth = layer.dataset.depth;
	const movement = -(layer.offsetHeight * depth)
	tl.to(layer, {y: movement, ease: "none"}, 0)
});


toggleButton.addEventListener("click", () => {
  console.log("fired");

  if (mobileMenu.classList.contains("show")) {
    // Hide the menu
    mobileMenu.classList.remove("show");
    mobileMenu.classList.add("hide");

    // wait for animation to finish before hide the menu
    setTimeout(() => {
      mobileMenu.classList.remove("hide");
      mobileMenu.style.display = "none";
    }, 500); // 500ms matches the animation duration

    toggleButtonIcon.classList.remove("fa-regular", "fa-circle-xmark");
    toggleButtonIcon.classList.add("fa-solid", "fa-bars");
  } else {
    // showing the hidden menu
    mobileMenu.style.display = "block";
    mobileMenu.classList.add("show");

    toggleButtonIcon.classList.remove("fa-solid", "fa-bars");
    toggleButtonIcon.classList.add("fa-regular", "fa-circle-xmark");
  }
});

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

  // Make info boxes
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