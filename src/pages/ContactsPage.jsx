import "./ContactsPage.css";
import '../App.css';
import { contacts } from "../data/contacts";
import ContactCard from "../components/ContactCard";

const ContactPage = () => (
  <main className="container-contacts">
    
    <section className="hero-contacts">
      <h1>Контакты фонда</h1>
      <p className="line">
        Мы всегда рады ответить на ваши вопросы и рассказать подробнее о наших
        проектах
      </p>
    </section>

<section className="location-section">
    <section className="adress">
      <div className="adres">
      <p >Юредический адрес:</p> <p><br/> Россия, Московская обл., Раменский м.о., пос. Кратово, ул. Молодцова, д. 21а140130, Московская область, Раменский район, г.п. Кратово, пос. Кратово, ул. Молодцова, д. 21‑а
        </p>
      </div>
      <div className="contacts-grid">
        {contacts.map((c, idx) => (
          <ContactCard
            key={idx}
            icon={c.icon}
            label={c.label}
            value={c.value}
          />
        ))}
      </div>
    </section>

    <section>
     
      <div className="map-block">
        <div className="map-placeholder">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=38.160427%2C55.586000&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTkyNTk2MzA0EssB0KDQvtGB0YHQuNGPLCDQnNC-0YHQutC-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0KDQsNC80LXQvdGB0LrQuNC5INC80YPQvdC40YbQuNC_0LDQu9GM0L3Ri9C5INC-0LrRgNGD0LMsINC_0L7RgdGR0LvQvtC6INCz0L7RgNC-0LTRgdC60L7Qs9C-INGC0LjQv9CwINCa0YDQsNGC0L7QstC-LCDRg9C70LjRhtCwINCc0L7Qu9C-0LTRhtC-0LLQsCwgMjEiCg1NohhCFdxXXkI%2C&z=15.73"
            width="100%"
            height="370"
            frameBorder="0"
            allowFullScreen
          ></iframe>
         
        </div>
      </div>
    </section>
    </section>

    <section className="formG">
      {/*<div></div>*/}
      <div>
      <h2 className="section-title">Напишите нам</h2>
      <form className="feedback-form" action="#" method="POST">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Ваше имя
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            required
            placeholder="Иван Иванов"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email для ответа
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            required
            placeholder="example@mail.ru"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="message">
            Сообщение
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            required
            placeholder="Расскажите, чем можем помочь?"
          ></textarea>
        </div>
        <button type="submit" className="btn-primary">
          Отправить сообщение
        </button>
      </form>
      
      </div>
      
    </section>
  </main>
);

export default ContactPage;
