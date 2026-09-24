import React from "react";
import HeroSection from "../components/HeroSection";
import RecipientCard from "../components/RecipientCard";
import "./HomePage.css";

function HomePage() {
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

  return (
    <>
      <div className="home-hero-bg"></div>
      <HeroSection />
    </>
  );
}

export default HomePage;
