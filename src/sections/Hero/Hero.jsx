import "./Hero.scss";
import Page2 from "./Page2/Page2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PillBottle, ShoppingBasket } from "lucide-react";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const pageRef = useRef(null);
  const canvasRef = useRef(null);

  const frames = useRef({
    currentIndex: 0,
    maxIndex: 342,
  });

  const images = useRef([]);
  const imagesLoaded = useRef(0);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    const loadImage = (index) => {
      const img = images.current[index];
      if (!img) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const scaleX = canvas.width / img.width;
      const scaleY = canvas.height / img.height;
      const scale = Math.min(scaleX, scaleY);

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      frames.current.currentIndex = index;
    };

    const startAnimation = () => {
      const ctx = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: ".container",
            start: "top top",
            scrub: 2,
          },
        })
          .to(".canvasContainer", { top: -10 }, "a")
          .to(
            frames.current,
            {
              currentIndex: frames.current.maxIndex,
              onUpdate: () => {
                loadImage(Math.floor(frames.current.currentIndex));
              },
            },
            "a"
          );
      }, pageRef);

      return () => ctx.revert();
    };

    const preloadImages = () => {
      for (let i = 1; i <= frames.current.maxIndex; i++) {
        const img = new Image();
        img.src = `/${i.toString().padStart(3, "0")}_pic.jpeg`;

        img.onload = () => {
          imagesLoaded.current++;

          if (i === 1) loadImage(0);

          if (imagesLoaded.current === frames.current.maxIndex) {
            startAnimation();
          }
        };

        images.current.push(img);
      }
    };

    preloadImages();
  }, []);

  return (
    <>
      <div className="page1" ref={pageRef}>
        <div className="background"></div>
        <div className="background2"></div>
        <div className="container">
          <div className="canvasContainer">
            <canvas ref={canvasRef} id="frame" />
          </div>
        </div>

        <div className="right-navigation">
          <a href="#">
            <PillBottle className="icon" />
          </a>
          <a href="#">
            <ShoppingBasket className="icon" />
          </a>
        </div>

        <div className="textBox">
          <p className="p1">fire roasted indian sauce</p>
          <h1 id="heading">bold flavour</h1>
          <h4>tikka masala</h4>
          <div id="box1">
            <p className="p2">bold flavours from the kitchens of India. Crafted for those who crave more.</p>
            <a href="#" className="btn">
              buy now
            </a>
          </div>
          <div className="box2">
            <h1>a new angle of flavour</h1>
            <p>Discover how our creamy tomato blend and authentic spices elevate every meal.</p>
          </div>
          <div className="box3">
            <h1>unwrap the</h1>
            <h1>adventure</h1>
          </div>
          <div className="box3">
            <div className="ingredients">
              <img src="/food1.png" alt="food1" />
              <img src="/food2.png" alt="food2" />
              <img src="/food3.png" alt="food3" />
            </div>
            <p>Crack open the jar and you're hit with the bold scent of fenugreek, garlic, and our signature masala blend. Rich, aromatic, and ready to transform any dish.</p>
          </div>
          <div className="rightDiv">
            <div className="rightContent">
              <p>Bold flavours, smooth textures, and a timeless taste of Indian tradition - all in one jar.</p>
              <a href="#" className="btn">buy now</a>
            </div>
          </div>
          <div className="leftDiv">
            <h1 id="subHeading">a new</h1>
            <h1 id="subHeading">perspective</h1>
            <h1 id="subHeading">on taste</h1>
          </div>
        </div>
      </div>

      <Page2 />
    </>
  );
};

export default Hero;
