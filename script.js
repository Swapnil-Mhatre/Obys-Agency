function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadAnimation() {
  let tl = gsap.timeline();

  tl.to(".main", {
    display: "none"
  })
  tl.from(
    ".counter",
    {
      duration: 1,
      opacity: 0,
      onStart: function () {
        const counter = document.querySelector(".count");
        let count = 0;
        let interval = setInterval(() => {
          count++;
          counter.innerHTML = count;
          if (count >= 100) {
            clearInterval(interval);
          }
        }, 30);
      },
    },
    "sync"
  );
  tl.from(
    ".line h1",
    {
      y: 100,
      stagger: 0.3,
      opacity: 0,
    },
    "sync"
  );
  tl.from(".loader p", {
    opacity: 0,
    duration: 0.5,
  });
  tl.to(".line h1, .line .counter, .loader p", {
    opacity: 0,
    stagger: 0.2,
    delay: 1.3,
  });
  tl.to(".loader", {
    y: "-100%",
    display: "none",
    duration: 0.7,
    ease: "power3.in",
  });
  tl.to(".main", {
    display:"block"
  })
  tl.from(
    "nav",
    {
      opacity: 0,
      duration: 0.5,
    },
    "Go"
  );
  tl.from(
    ".line-splitText h1",
    {
      y: "100%",
      opacity: 0,
      stagger: 0.2,
    },
    "Go"
  );
}

function splitchar() {
  let words = document.querySelectorAll(".word");
  words.forEach((word, idx) => {
    let clutter = "";
    let splittedWord = word.textContent.split("");
    splittedWord.forEach((char) => {
      clutter += `<span class="char">${char}</span>`;
    });
    words[idx].innerHTML = clutter;
  });
}

function handleVideoCon() {
  const videoCon = document.querySelector(".videoBox");
  const video = document.querySelector(".videocontrol");
  const videoBtn = document.querySelector(".image-cursor i");

  videoCon.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      gsap.to(".img-overlap", {
        opacity: 0,
      });
      gsap.to(".image-cursor", {
        scale: 0.5,
      });
      videoBtn.classList.remove("ri-play-fill");
      videoBtn.classList.add("ri-pause-fill");
    } else {
      video.pause();
      gsap.to(".img-overlap", {
        opacity: 1,
      });
      gsap.to(".image-cursor", {
        scale: 1,
      });
      videoBtn.classList.remove("ri-pause-fill");
      videoBtn.classList.add("ri-play-fill");
    }
  });

  videoCon.addEventListener("mousemove", (dets) => {
    gsap.to(".mousefollower", {
      scale: 0,
      duration: 0.1,
    });
    gsap.to(".image-cursor", {
      left: dets.x,
      top: dets.y,
    });
  });
  videoCon.addEventListener("mouseleave", () => {
    gsap.to(".mousefollower", {
      scale: 2.5,
      duration: 0.1,
    });
    gsap.to(".image-cursor", {
      left: "90%",
      top: "10%",
    });
  });
}

function sheryAnimation() {
  Shery.mouseFollower({
    ease: "cubic-beizer(0.23, 1, 0.320, 1)",
    duration: 0.5,
  });

  Shery.makeMagnet(".list h4 ", {});
  Shery.imageEffect(".image-div", {
    style: 5,
    config: {
      a: { value: 1.2, range: [0, 30] },
      b: { value: 0.5, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272784550924614 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.83, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: false },
      maskVal: { value: 1, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.7, range: [0, 10] },
      metaball: { value: 0.4, range: [0, 2] },
      discard_threshold: { value: 0.6, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.6, range: [0, 2] },
      noise_scale: { value: 8, range: [0, 100] },
    },
    gooey: true,
  });
}

function hoverImage() {
  const splitWords = document.querySelectorAll(".line-splitText h1 span");
  splitWords.forEach((splitWord) => {
    splitWord.addEventListener("mousemove", (dets) => {
      gsap.to(".flag", {
        top: dets.y,
        left: dets.x,
        opacity: 1,
      });
    });
    splitWord.addEventListener("mouseleave", () => {
      gsap.to(".flag", {
        opacity: 0,
      });
    });
  });
}

function fadeAnimation() {
  const word = document.querySelector(".word");
  const chars = document.querySelectorAll(".char");
  word.addEventListener("mouseover", () => {
    chars.forEach((char) => {
      char.classList.add("italic");
    });
    gsapFade()
  });
  word.addEventListener("mouseleave", () => {
    chars.forEach((char) => {
      char.classList.remove("italic");
    });
    gsapFade();
  });
  function gsapFade() {
    gsap.to(".char", {
      duration: 0.3,
      opacity: 0,
      stagger: 0.05,
    });
    gsap.to(".char", {
      duration: 0.3,
      opacity: 1,
      stagger: 0.07,
      delay: 0.05,
    });
  }
}

loadAnimation();
handleVideoCon();
locomotiveAnimation();
sheryAnimation();
hoverImage();
splitchar();
fadeAnimation();
