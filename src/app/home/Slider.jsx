import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";
import styles from "./Slider.module.css";

const SliderComponent = () => {
  const sponsors = [
    "bosch.png",
    "castellari.png",
    "dewaltt.png",
    "makita.png",
    "philips.png",
    "stanley.png",
  ];

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={3000}
        renderArrowNext={() => null}
        showStatus={false}
        className={styles.carousel}
      >
        {sponsors.map((sponsor, index) => (
          <div key={index}>
            <Image
              src={`/images/sponsors/${sponsor}`}
              alt={sponsor}
              className={styles.carouselImage}
              width={150}
              height={150}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SliderComponent;
