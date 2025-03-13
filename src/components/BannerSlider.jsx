import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const slides = [
    {
      title: "Explore Visa Options",
      subtitle: "Find the perfect visa for your travel needs",
      image: "https://i.ibb.co.com/wZdtGbJc/The-Most-Popular-Languages.jpg",
      cta: "Browse Visas",
      link: "/all-visas",
    },
    {
      title: "Fast Visa Processing",
      subtitle: "Get your visa approved in just 3 days",
      image: "https://i.ibb.co.jvy9tQjk/images.jpg",
      cta: "Apply Now",
      link: "/add-visa",
    },
    {
      title: "Travel with Confidence",
      subtitle: "We guide you through every step of the visa process",
      image:
        "https://i.ibb.co/VW0rLVfy/022a0000-0aff-0242-a5ef-08daee56478c-w1597-n-r1-st-s.jpg",
      cta: "Learn More",
      link: "/about",
    },
  ];

  return (
    <section className="relative h-[70vh] w-full">
      {/* Navigation Arrows */}
      <button
        onClick={() => sliderRef.current.slickPrev()}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/40 transition"
      >
        <ChevronLeftIcon className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={() => sliderRef.current.slickNext()}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 bg-white/20 rounded-full hover:bg-white/40 transition"
      >
        <ChevronRightIcon className="w-8 h-8 text-white" />
      </button>

      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[70vh] w-full">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="max-w-3xl mx-auto px-6 text-center text-white">
                  <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-2xl mb-6 animate-fade-in-up delay-100">
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition animate-fade-in-up delay-200"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default BannerSlider;
