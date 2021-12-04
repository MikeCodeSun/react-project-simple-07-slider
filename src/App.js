import { useEffect, useState } from "react";
import data from "./data";

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(people.length - 1);
    }
    if (index > people.length - 1) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index - 1);
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>Reviews
        </h2>
        <div className="title-underline"></div>
      </div>
      <div className="container">
        {people.map((person, personIndex) => {
          const { id, name, image, title, quote } = person;
          let position = "nextSlide";
          if (index === personIndex) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="img person-img" />
              <div className="info">
                <h4>{name}</h4>
                <h4>{title}</h4>
                <p>{quote}</p>
              </div>
            </article>
          );
        })}
        <button
          className="btn btn-hipster btn-prev"
          onClick={() => setIndex(index - 1)}
        >
          &#8592;
        </button>
        <button
          className="btn btn-hipster btn-next"
          onClick={() => setIndex(index + 1)}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}

export default App;
