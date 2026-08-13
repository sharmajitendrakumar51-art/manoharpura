import { useEffect, useState } from "react";
import api from "../api/axios";
import "../assets/css/Hero.css";

const Hero = () => {

  const [heroes, setHeroes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==============================
  // Fetch Heroes
  // ==============================

  useEffect(() => {

    const fetchHeroes = async () => {

      try {

        const response = await api.get("/hero");

        console.log("HERO API RESPONSE:", response.data);

        if (response.data.success) {

          const activeHeroes = (response.data.heroes || [])
            .filter((hero) => hero.status === "Active")
            .sort((a, b) => {
              return (a.order || 0) - (b.order || 0);
            });

          setHeroes(activeHeroes);

        }

      } catch (error) {

        console.error("Hero API Error:", error);

      } finally {

        setLoading(false);

      }

    };

    fetchHeroes();

  }, []);


  // ==============================
  // Auto Slider
  // ==============================

  useEffect(() => {

    if (heroes.length <= 1) {
      return;
    }

    const interval = setInterval(() => {

      setCurrentIndex((prevIndex) => {

        return (prevIndex + 1) % heroes.length;

      });

    }, 5000);

    return () => clearInterval(interval);

  }, [heroes]);


  // ==============================
  // Loading
  // ==============================

  if (loading) {

    return (
      <section className="hero-section hero-loading">

        <div className="hero-loading-content">

          <div className="spinner-border"></div>

        </div>

      </section>
    );

  }


  // ==============================
  // No Hero
  // ==============================

  if (!heroes.length) {
    return null;
  }


  return (

    <section className="hero-section">

      <div className="hero-slider">

        {heroes.map((hero, index) => (

          <div
            key={hero._id}
            className={`hero-slide ${
              index === currentIndex ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${hero.image?.url})`,
            }}
          >

            {/* Dark Overlay */}

            <div className="hero-overlay"></div>


            {/* Content */}

            <div className="hero-container">

              <div className="hero-content">

                {/* Small Heading */}

                {hero.smallHeading && (

                  <div className="hero-small-heading">

                    {hero.smallHeading}

                  </div>

                )}


                {/* Main Title */}

                {hero.title && (

                  <h1 className="hero-title">

                    {hero.title}

                  </h1>

                )}


                {/* Description */}

                {hero.description && (

                  <p className="hero-description">

                    {hero.description}

                  </p>

                )}

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

};

export default Hero;