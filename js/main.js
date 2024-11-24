(() => {

  // Main Nav
  /*Menu*/
const toggleButton = document.querySelector(".toggle_button");
const toggleButtonIcon = document.querySelector(".toggle_button i");
const mobileMenu = document.querySelector("#mobile_dropdown_menu");

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

  const divisor = document.querySelector("#divisor");
  const slider = document.querySelector("#slider");
  
  function moveDivisor() {
    console.log(slider.value);
    divisor.style.width = slider.value+"%";
    // js파일이 css 프로펄티를 따르도록 설정한것.   
  }
  slider.addEventListener("input", moveDivisor);
  // 콘솔에서 1부터 100까지 찍힘 cause html에서 그렇게 정의함
  
  // const canvas = document.querySelector("#explode-view");
  //   const context = canvas.getContext("2d");

  //   canvas.width = 1920;
  //   canvas.height = 1080;

  //   const frameCount = 100; // 총 프레임 수
  //   const images = [];
  //   let imagesLoaded = 0;

  //   // 이미지 배열 생성 (animation0000.png부터 시작)
  //   for (let i = 0; i < frameCount; i++) {
  //       const img = new Image();
  //       img.src = `images/animation${i.toString().padStart(4, '0')}.png`; // 시작 프레임 변경

  //       img.onload = () => {
  //           imagesLoaded++;
  //           if (imagesLoaded === frameCount) {
  //               initAnimation();
  //           }
  //       };

  //       img.onerror = () => {
  //           console.error(`이미지 로드 실패: ${img.src}`);
  //       };

  //       images.push(img);
  //   }

  //   const buds = { frame: 0 };

  //   function initAnimation() {
  //       gsap.registerPlugin(ScrollTrigger);

  //       gsap.to(buds, {
  //           frame: frameCount - 1, // 마지막 프레임으로 이동
  //           snap: "frame",
  //           scrollTrigger: {
  //               trigger: "#explode-view",
  //               pin: true,
  //               scrub: 1,
  //               markers: true,
  //               start: "top top"
  //           },
  //           onUpdate: render
  //       });

  //       render();
  //   }

  //   function render() {
  //       context.clearRect(0, 0, canvas.width, canvas.height);
  //       const currentImage = images[Math.round(buds.frame)];
  //       if (currentImage) {
  //           context.drawImage(currentImage, 0, 0);
  //       }
  //   }
  const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

const frameCount = 100; // 총 프레임 수
const images = [];
let imagesLoaded = 0;

// 화면 크기에 따라 캔버스 크기 조정
function resizeCanvas() {
    const width = window.innerWidth;
    if (width > 1024) {
        // 데스크톱
        canvas.width = width;
        canvas.height = window.innerHeight * 1.2; // 높이를 120%로 늘림
    } else if (width > 768) {
        // 태블릿
        canvas.width = width;
        canvas.height = window.innerHeight * 1.1; // 높이를 110%로 늘림
    } else {
        // 모바일
        canvas.width = width;
        canvas.height = window.innerHeight * 0.7; // 높이를 70%로 줄임
    }
}
resizeCanvas(); // 초기 설정
window.addEventListener("resize", resizeCanvas); // 화면 크기 변경 대응

// 이미지 배열 생성 (animation0000.png부터 시작)
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/animation${i.toString().padStart(4, "0")}.png`;

    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
            initAnimation();
        }
    };

    img.onerror = () => {
        console.error(`이미지 로드 실패: ${img.src}`);
    };

    images.push(img);
}

const buds = { frame: 0 };

function initAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(buds, {
        frame: frameCount - 1, // 마지막 프레임으로 이동
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            markers: false, // 디버깅용 마커 제거
            start: "top top",
            end: "+=200%", // 스크롤 길이 조정
        },
        onUpdate: render,
    });

    render(); // 첫 프레임 렌더링
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const currentImage = images[Math.round(buds.frame)];
    if (currentImage) {
        // 이미지가 캔버스를 꽉 채우도록 드로잉
        const scale = Math.max(
            canvas.width / currentImage.width,
            canvas.height / currentImage.height
        );
        const x = (canvas.width - currentImage.width * scale) / 2;
        const y = (canvas.height - currentImage.height * scale) / 2;
        context.drawImage(
            currentImage,
            x,
            y,
            currentImage.width * scale,
            currentImage.height * scale
        );
    }
}

  
})();