import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hidden-section ${isVisible ? "fade-up-lift" : ""}`}
      style={{ ...styles.section, backgroundColor: "transparent" }}
    >
      <div style={styles.container}>
        {/* Image Grid */}
        <div style={styles.imageGrid}>
          <div style={styles.gridBox}>
            <div style={styles.largeImageBottom}>
              <Image
                src="/dish1.jpg"
                alt="Larger Bottom Left"
                fill
                style={styles.image}
              />
            </div>
            <div style={styles.bigImage}>
              <Image
                src="/dish2.jpg"
                alt="Big Bottom Right"
                fill
                style={styles.image}
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div style={styles.textContent}>
          <h4 style={styles.subtitle}>About Us</h4>
          <h2 style={styles.title}>
            Welcome to{" "}
            <span role="img" aria-label="fork and knife">
              🍴
            </span>{" "}
            Restoran
          </h2>
          <p style={styles.paragraph}>
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem
            sit.
          </p>
          <p style={styles.paragraph}>
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet.
          </p>

          <div style={styles.stats}>
            <div style={styles.statBox}>
              <h3 style={styles.statNumber}>15</h3>
              <p>
                <strong>Years of</strong>
                <br />
                Experience
              </p>
            </div>
            <div style={styles.statBox}>
              <h3 style={styles.statNumber}>50</h3>
              <p>
                <strong>Popular</strong>
                <br />
                Master Chefs
              </p>
            </div>
          </div>

          <button className="hover-button">READ MORE</button>
        </div>
      </div>

      {/* Animation + Hover CSS */}
      <style jsx>{`
        .hidden-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        .fade-up-lift {
          opacity: 1;
          transform: translateY(0);
        }
        .hover-button {
          padding: 10px 30px;
          background-color: orange;
          color: #fff;
          border: none;
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        .hover-button:hover {
          background-color: darkorange;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

const styles = {
  section: {
    padding: "60px 20px",
    backgroundColor: "transparent", // transparent background
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "40px",
    alignItems: "flex-start",
  },
  imageGrid: {
    position: "relative",
    width: "300px",
    height: "300px",
  },
  gridBox: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "grid",
    gap: "10px",
  },
  bigImage: {
    position: "relative",
    width: "100%",
    height: "100%",
    gridColumn: "2",
    gridRow: "1 ",
  },
  largeImageBottom: {
    position: "relative",
    width: "150%",
    height: "150%",
    gridColumn: "1",
    gridRow: "2",
  },
  image: {
    borderRadius: "6px",
    objectFit: "cover",
  },
  textContent: {
    maxWidth: "600px",
  },
  subtitle: {
    color: "orange",
    fontWeight: "600",
    fontSize: "18px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px",
  },
  stats: {
    display: "flex",
    gap: "40px",
    margin: "30px 0",
  },
  statBox: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "36px",
    color: "orange",
    marginBottom: "5px",
  },
};

export default AboutSection;
