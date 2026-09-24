import "./AboutPage.css";
import { activities } from "../data/activities";
import ActivityCard from "../components/ActivityCard";
import { useEffect } from "react";

const AboutPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
      }
    }
  }, []);
  
  return(
  <main className="Aboutpage">

    <section className="hero-project">
      <div className="hero-emote">
        
<svg  viewBox="0 0 103 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32.2167 84.6329L76.1585 84.6417L95.6975 50.214L14.7781 50.1978L32.2167 84.6329Z" fill="#FFDCBF"/>
<path d="M19.9688 26.0586C19.0745 26.4019 19.1235 27.6836 20.0412 27.9522L38.1908 33.2633C38.2841 33.2906 38.3729 33.3314 38.4544 33.3844L52.693 42.6486C53.3748 43.0922 54.2747 42.5765 54.2389 41.7627L53.0503 14.765C53.0203 14.0839 52.3326 13.6339 51.6956 13.8785L19.9688 26.0586Z" fill="#FFFAEF"/>
<path d="M20.1466 26.5251C19.6996 26.6967 19.7239 27.3382 20.1825 27.4727L38.333 32.7835C38.4728 32.8245 38.606 32.8859 38.728 32.9653L52.9666 42.229C53.3075 42.4508 53.7577 42.1928 53.7398 41.786L52.5513 14.7887C52.5363 14.4482 52.1923 14.2234 51.8739 14.3454L20.1466 26.5251Z" stroke="#482811" stroke-opacity="0.45"/>
<rect width="2.33884" height="33.4096" transform="matrix(-0.999995 -0.0030474 -0.00690719 0.999976 57.7964 15.0805)" fill="#7E3311"/>
<path d="M93.0934 51.8457L18.7186 51.6191L23.815 60.915L87.3467 61.1086L93.0934 51.8457Z" fill="#C79164"/>
<path d="M87.8678 63.4304L24.7194 63.2379L27.6103 69.279L84.698 69.453L87.8678 63.4304Z" fill="#BD7B45"/>
<path d="M82.2034 70.8374L28.4103 70.6735L30.87 76.2492L79.5002 76.3974L82.2034 70.8374Z" fill="#A66631"/>
<path d="M79.3455 78.2531L31.6334 78.1077L34.5937 82.7569L76.6535 82.8851L79.3455 78.2531Z" fill="#9A6234"/>
</svg>
      </div>
      <h1>Территория деятельной интеграции инвалидов «Ковчег радости»</h1>
      <p className="hero-lead">
        14 октября 2014 года состоялось долгожданное открытие проекта. Иногда самое
        важное, что может получить человек, — это не просто помощь, а
        возможность самому что-то делать, участвовать и быть нужным.
      </p>
    </section>

    <section className="section-about">
      <h2 className="section-title">О проекте</h2>
      <div className="project-intro">
        <p>
          «Ковчег радости» создан для совершеннолетних людей с тяжёлой ментальной инвалидностью, которые по ограниченным возможностям здоровья не могут учиться или работать в обычных условиях, но
          очень хотят развиваться. Для них это не просто кружок, а
          пространство,где можно найти добрых друзей, необходимое социальное общение, дело по душе, научиться новому и
          встретить тех, кто понимает их.
        </p>
        <p>
          Мы верим, что каждому человеку важно иметь занятие, которое даёт
          ощущение опоры и смысла. Здесь это становится возможным.
        </p>
      </div>
    </section>

    <section className="section-activities">
      <h2 className="section-title">Чем можно заниматься в «Ковчеге»</h2>
      <div className="activities-grid">
        {activities.map((item, idx) => (
          <ActivityCard key={idx} icon={item.icon} title={item.title} />
        ))}
      </div>
    </section>

    <section className="section-facts">
      <h2 className="section-title">Как устроено</h2>
      <div className="facts-grid">
        <div className="fact-card">
          <span className="fact-value">3 дня в неделю</span>
          <span className="fact-label">пн–пт, 10:00–16:00</span>
        </div>
        <div className="fact-card">
          <span className="fact-value">Бесплатно</span>
          <span className="fact-label">для участников</span>
        </div>
        <div className="fact-card">
          <span className="fact-value">Без родителей</span>
          <span className="fact-label">рядом тьюторы</span>
        </div>
      </div>
    </section>

    <section  id="help" className="section-support"  style={{ scrollMarginTop: '100px' }}>
      <h2 className="section-title">Поддержите «Ковчег»</h2>
      <div className="support-section">

        <div className="inf">
     
        <p className="support-description">
          Поскольку у проекта нет постоянного спонсора, мы искренне благодарны
          за любую поддержку. Каждый перевод — это ещё один день, когда человек
          приходит в мастерскую, берёт в руки глину или ткань, делает шаг вперёд
          и чувствует, что у него получается.
        </p>


        <div className="qr">
            <img src="/images/qr240.jpg" alt="gr" className="qr" />
           </div>
        </div>
       {/* <button className="btn-primary">Помочь проекту</button>*/}

          
            <div className="requisites-plain">
  <div className="requisite-row">
    <span className="requisite-label">Полное наименование:</span>
    <span className="requisite-value">
      Автономная некоммерческая организация социальной реабилитации инвалидов «Ковчег Радости»
    </span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">Сокращённое наименование:</span>
    <span className="requisite-value">АНО «Ковчег Радости»</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">ИНН:</span>
    <span className="requisite-value">5040200679</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">КПП:</span>
    <span className="requisite-value">504001001</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">ОГРН:</span>
    <span className="requisite-value">1265000027500</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">Юридический адрес:</span>
    <span className="requisite-value">
      140130, Московская область, м.о. Раменский, пгт. Кратово, ул. Молодцова, дом 21А
    </span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">Директор:</span>
    <span className="requisite-value">Власова Наталья Юрьевна</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">Налогообложение:</span>
    <span className="requisite-value">УСН, без НДС</span>
  </div>
  
  <div className="requisite-row">
    <span className="requisite-label">Расчётный счёт:</span>
    <span className="requisite-value">40703810100810020654</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">Банк:</span>
    <span className="requisite-value">Филиал «Центральный» Банка ВТБ (ПАО)</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">БИК:</span>
    <span className="requisite-value">044525411</span>
  </div>

  <div className="requisite-row">
    <span className="requisite-label">Корр. счёт:</span>
    <span className="requisite-value">30101810145250000411</span>
  </div>
  <div>
        <img src="/images/Ark.png" alt="gr" className="qr" />   
      </div>
</div>

        

      </div>



     
    </section>
  </main>
);
}

export default AboutPage;
