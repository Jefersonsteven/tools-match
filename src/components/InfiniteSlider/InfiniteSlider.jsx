import Image from "next/image";
import styles from "./InfiniteSlider.module.css";

const InfiniteSlider = () => {
  const sponsors = [
    "bosch.png",
    "castellari.png",
    "dewaltt.png",
    "dremel.png",
    "fischer.png",
    "karcher.png",
    "libus.png",
    "makita.png",
    "philips.png",
    "stanley.png",
    "skil.png",

    "bosch.png",
    "castellari.png",
    "dewaltt.png",
    "dremel.png",
    "fischer.png",
    "karcher.png",
    "libus.png",
    "makita.png",
    "philips.png",
    "stanley.png",
    "skil.png",
  ];

  return (
    <section>
      <div className={styles.mySlider}>
        <div className={styles.mySlideTrack}>
          {sponsors.map((sponsor, index) => {
            return (
              <div key={index} className={styles.mySlide}>
                <Image
                  className={styles.slideImg}
                  src={`/images/sponsors/${sponsor}`}
                  width={300}
                  height={150}
                  alt={sponsor}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfiniteSlider;
