import React, { useState, useRef } from "react";
import ScrollableCardList from "../components/ScrollableCardList";
import RecipientCard from "../components/RecipientCard";
import "./GalleryPage.css";

const GalleryPage = () => {
  const wrapperRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const STEP = 280;

  const updateButtons = () => {
    const w = wrapperRef.current;
    if (!w) return;
    setCanScrollLeft(w.scrollLeft > 0);
    setCanScrollRight(w.scrollLeft + w.clientWidth < w.scrollWidth - 1);
  };

  const handlePrev = () => {
    wrapperRef.current?.scrollBy({ left: -STEP, behavior: "smooth" });
  };

  const handleNext = () => {
    wrapperRef.current?.scrollBy({ left: STEP, behavior: "smooth" });
  };

  const recipients = [
    {
      id: 1,
      name: "Смелков Алексей Павлович",
      year: "20.02.2000г.",
      description: "Лёша очень позитивный и всегда всё выполняет на 5+",
      image: "/images/13.JPG",
    },
    {
      id: 2,
      name: "Любавин Трифон Геннадьевич",
      year: "14.02.1997",
      description:
        "У Трифона очень сильные руки, он обожает мастерить из дерева",
      image: "/images/12.JPG",
    },
    {
      id: 3,
      name: "Левинских Иван Александрович",
      year: "26.08.1999г.",
      description: "Ваня обожает тортики и заниматься кулинарией",
      image: "/images/22.JPG",
    },
    {
      id: 4,
      name: "Егоров Дмитрий Андреевич",
      year: "20.03.2003г.",
      description: "Дима прирождённый керамист, просто обожает глину",
      image: "/images/21.JPG",
    },
    {
      id: 5,
      name: "Воронин Артём Олегович.",
      year: "20.12.2004г.",
      description: "Тёма больше всего любит занятия кулинарией и мозаику",
      image: "/images/11.JPG",
    },
    {
      id: 6,
      name: "Власова Елизавета Юрьевна",
      year: "05.09.2001г.",
      description: "Лиза очень любит вязать и заниматься мозаикой",
      image: "/images/16.JPG",
    },
    {
      id: 7,
      name: "Барановские Полина и София",
      year: "23.01.2001г.",
      description: "Наши девочки-цветочки, украшение нашего коллектива",
      image: "/images/15.JPG",
    },
    {
      id: 8,
      name: "Збарский Михаил Владимирович",
      year: "30.12.1981г.",
      description: "Самый нежный, деликатный и трогательный подопечный",
      image: "/images/14.JPG",
    },
    {
      id: 9,
      name: "Лагутина Кристина Александровна",
      year: "09.12.1995г.",
      description: "Кристина у нас просто Красавица",
      image: "/images/17.JPG",
    },
    {
      id: 10,
      name: "Лебедев Олег Владимирович",
      year: "28.07.1984г.",
      description: "Любит всё делать быстро и не любит однообразной работы",
      image: "/images/23.JPG",
    },
    {
      id: 11,
      name: "Фролова Евгения Германовна",
      year: "22.09.1985г.",
      description:
        "Наш самый строгий критик качества изделий и социальных норм поведения",
      image: "/images/18.JPG",
    },
  ];

  const galleryImages = [
    "/images/1.JPG",
    "/images/4.JPG",
    "/images/5.JPG",
    "/images/6.JPG",
    "/images/8.JPG",
    "/images/9.JPG",
    "/images/10.JPG",
  ];

  return (
    <div className="gallery-water-wrap">
      {/* Декоративные слои — вынесены в отдельный контейнер */}
      <div className="gallery-decor">
        <div className="gallery-seaweed-bg"></div>

        <div className="gallery-fish">
          <svg width="198" height="59" viewBox="0 0 198 59" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="83.2327" cy="29.5" rx="83.2327" ry="29.5" fill="#E77F56"/>
            <path d="M158.305 28L197.799 6.12043L189.858 30.4983L197.243 55.4812L158.305 28Z" fill="#E77F56"/>
            <ellipse cx="31.5522" cy="20.5" rx="4.35204" ry="3.5" fill="#FFFAEF"/>
            <ellipse cx="33.1843" cy="21.5" rx="2.72002" ry="2.5" fill="#333333"/>
            <path d="M67.4564 30.6982L61.0756 58C56.5114 57.5442 52.1 56.9743 47.8724 56.2998L54.1996 30.6982L49.0277 2.69434C53.4586 2.01261 58.085 1.44268 62.8724 1L67.4564 30.6982Z" fill="#F7FFCD"/>
            <path d="M86.3512 0C87.7897 4.57326e-08 89.2197 0.0125283 90.6403 0.0380859L94.3248 30.542L90.774 58.958C89.3095 58.9852 87.8349 59 86.3512 59C83.3388 59 80.3638 58.9416 77.4342 58.8311L81.9703 31.085L77.2487 0.175781C80.2382 0.0605326 83.2752 0 86.3512 0Z" fill="#F7FFCD"/>
            <path d="M106.068 1C110.032 1.36979 113.881 1.84063 117.591 2.4043L121.088 28.1797L118.54 56.5068C114.537 57.136 110.369 57.6572 106.065 58.0586L109.121 29.2598L106.068 1Z" fill="#F7FFCD"/>
          </svg>
        </div>
        <div className="gallery-fish" style={{ animationDirection: "reverse" }}>
          <svg width="106" height="45" viewBox="0 0 106 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="44.6043" cy="22.5" rx="44.6043" ry="22.5" transform="matrix(-1 0 0 1 106 0)" fill="#56E79A"/>
            <path d="M21.1643 21.3559L2.01053e-05 4.66811L4.25546 23.2614L0.297667 42.3162L21.1643 21.3559Z" fill="#56E79A"/>
            <ellipse cx="2.33225" cy="2.66949" rx="2.33225" ry="2.66949" transform="matrix(-1 0 0 1 91.4235 12.9661)" fill="#FFFAEF"/>
            <ellipse cx="1.45766" cy="1.90678" rx="1.45766" ry="1.90678" transform="matrix(-1 0 0 1 89.6743 14.4915)" fill="#333333"/>
            <path d="M69.8501 23.4141L73.27 44.2363C75.7158 43.8887 78.0798 43.4549 80.3452 42.9404L76.9546 23.4141L79.7261 2.05469C77.3514 1.53469 74.8719 1.10035 72.3062 0.762695L69.8501 23.4141Z" fill="#F7FFCD"/>
            <path d="M59.7246 0C58.9536 0 58.1871 0.00980007 57.4258 0.0292969L55.4512 23.2949L57.3545 44.9678C58.1393 44.9885 58.9296 45 59.7246 45C61.3389 45 62.933 44.9554 64.5029 44.8711L62.0723 23.709L64.6025 0.133789C63.0005 0.0458889 61.373 1.94875e-06 59.7246 0Z" fill="#F7FFCD"/>
            <path d="M49.1589 0.762695C47.0342 1.04474 44.9714 1.40308 42.9832 1.83301L41.1091 21.4932L42.4753 43.0986C44.6199 43.5784 46.8533 43.9761 49.1599 44.2822L47.5222 22.3164L49.1589 0.762695Z" fill="#F7FFCD"/>
          </svg>
        </div>
        <div className="gallery-fish">
          <svg width="102" height="65" viewBox="0 0 102 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="42.9142" cy="32.5" rx="42.9142" ry="32.5" fill="#19FCF0"/>
            <path d="M81.6343 30.8474L102 6.74277L97.9051 33.5998L101.714 61.1233L81.6343 30.8474Z" fill="#19FCF0"/>
            <ellipse cx="16.3145" cy="22.1" rx="2.8373" ry="3.9" fill="#FFFAEF"/>
            <ellipse cx="17.3785" cy="23.4" rx="1.77332" ry="2.6" fill="#333333"/>
            <path d="M33.2787 34.8172L30.3666 63.6512C28.2102 63.1651 26.125 62.5546 24.1254 61.8299L27.0111 34.8172L24.475 3.04474C26.5752 2.30118 28.7677 1.68192 31.0365 1.20099L33.2787 34.8172Z" fill="white"/>
            <path d="M43.193 0C43.9347 0 44.6725 0.0138437 45.4049 0.0419922L47.3053 33.6484L45.4733 64.9541C44.7183 64.984 43.9578 65 43.193 65C41.6397 65 40.1059 64.9353 38.5953 64.8135L40.9342 34.2461L38.4996 0.193359C40.0411 0.0664066 41.6069 1.24311e-05 43.193 0Z" fill="#F8FDFF"/>
            <path d="M53.0134 1.10196C55.0579 1.50937 57.0426 2.02783 58.9558 2.64883L60.7595 31.0453L59.4441 62.2533C57.3806 62.9464 55.2319 63.5201 53.0125 63.9623L54.5876 32.2348L53.0134 1.10196Z" fill="#F8FDFF"/>
          </svg>
        </div>
        <div className="gallery-fish">
          <svg width="65" height="33" viewBox="0 0 65 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="27.3473" cy="16.5" rx="27.3473" ry="16.5" fill="#7768BA"/>
            <path d="M52.0219 15.661L65 3.42326L62.3905 17.0584L64.8174 31.0318L52.0219 15.661Z" fill="#AAA0D4"/>
            <ellipse cx="10.3965" cy="11.22" rx="1.80809" ry="1.98" fill="#FFFAEF"/>
            <ellipse cx="11.0745" cy="11.88" rx="1.13005" ry="1.32" fill="#333333"/>
            <path d="M21.207 17.6761L19.3516 32.3148C17.9774 32.068 16.6483 31.7589 15.374 31.391L17.2129 17.6761L15.5967 1.54529C16.9351 1.16779 18.3325 0.853905 19.7783 0.609741L21.207 17.6761Z" fill="white"/>
            <path d="M27.5253 0C27.9976 5.83264e-07 28.4671 0.00721433 28.9335 0.0214844L30.1454 17.083L28.9774 32.9766C28.4965 32.9917 28.0124 33 27.5253 33C26.5352 33 25.5574 32.9671 24.5946 32.9053L26.0858 17.3867L24.5341 0.0976562C25.5164 0.0331997 26.5145 0 27.5253 0Z" fill="#F8FDFF"/>
            <path d="M33.7825 0.559448C35.0854 0.76628 36.3503 1.02932 37.5696 1.3446L38.719 15.7616L37.8811 31.6044C36.566 31.9562 35.1969 32.249 33.7825 32.4735L34.7864 16.3651L33.7825 0.559448Z" fill="#F8FDFF"/>
          </svg>
        </div>
        <div className="gallery-fish"></div>

        <div className="gallery-bubbles">
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
          <div className="gallery-bubble"></div>
        </div>
      </div>

      {/* Контент поверх фона */}

      {/* Раздел подопечных */}
      <section className="gallery-recipients-section">
        <div className="gallery-recipients-container">
          <h2 className="gallery-recipients-title">Наши подопечные</h2>
          <ScrollableCardList
            items={recipients}
            CardComponent={RecipientCard}
          />
        </div>
      </section>

      {/* Раздел фотогалереи */}
      <section className="gallery-page">
        <div className="gallery-scroll-container">
          <h2 className="gallery-title">Фотогалерея</h2>

          <div className="gallery-scroll-viewport">
            {canScrollLeft && (
              <button
                type="button"
                className="scroll-btn scroll-btn-prev"
                aria-label="Назад"
                onClick={handlePrev}
              >
                <span className="scroll-btn-icon">←</span>
              </button>
            )}

            <div
              className="gallery-scroll-wrapper"
              ref={wrapperRef}
              onScroll={updateButtons}
            >
              {galleryImages.map((src, idx) => (
                <div key={idx} className="gallery-item">
                  <img
                    src={src}
                    alt={`Фото ${idx + 1}`}
                    className="gallery-image"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {canScrollRight && (
              <button
                type="button"
                className="scroll-btn scroll-btn-next"
                aria-label="Вперёд"
                onClick={handleNext}
              >
                <span className="scroll-btn-icon">→</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;






