import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import styles from "./Main.module.scss";

export default function Main({
  onOpen,
  setId,
  keywordValue,
  countryValue,
  maxNum,
}) {
  const events = useSelector((state) => state.events.events);
  return (
    <section className={styles.main}>
      <div className="container">
        <ul className={styles.list}>
          {events.map(({ id, name, dates, images, _embedded: locate }) => (
            <li key={id} className={styles.item}>
              <div
                className={styles.thumb}
                onClick={() => {
                  onOpen();
                  setId(id);
                }}
              >
                <img src={images[0].url} alt={name} className={styles.img} />
              </div>
              <h3 className={styles.title}>{name}</h3>
              <p className={styles.date}>{dates.start.localDate}</p>
              <address className={styles.location}>
                <svg className={styles.locationIcon}>
                  <use href="/icons/symbol-defs.svg#icon-locate"></use>
                </svg>
                {locate?.venues[0].name}
              </address>
            </li>
          ))}
        </ul>
        <Pagination
          keywordValue={keywordValue}
          countryValue={countryValue}
          maxNum={maxNum}
        ></Pagination>
      </div>
    </section>
  );
}
