import styles from "./Modal.module.scss";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

export default function Modal({ id, onClose }) {
  const events = useSelector((state) => state.events.events);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <p className={styles.text}>Завантаження...</p>
        </div>
      </div>
    );
  }

  const image = event.images?.[0]?.url ?? "";
  const info = event.info ?? "Немає додаткової інформації";
  const date = event.dates?.start?.localDate ?? "Дата не вказана";
  const time = event.dates?.start?.localTime ?? "Час не вказаний";
  const city = event._embedded?.venues?.[0]?.city?.name ?? "Місто невідоме";
  const country =
    event._embedded?.venues?.[0]?.country?.name ?? "Країна невідома";
  const venue = event._embedded?.venues?.[0]?.name ?? "Місце не вказано";
  const artist =
    event._embedded?.attractions?.[0]?.name ?? "Виконавець невідомий";

  const tickets = event.priceRanges?.map((p, i) => ({
    type: p.type ?? `Тип ${i + 1}`,
    min: p.min ?? 0,
    max: p.max ?? 0,
    currency: p.currency ?? "UAH",
  }));

  const moreUrl = event.url ?? "#";

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.btnClose} onClick={onClose}>
          <AiOutlineClose className={styles.iconClose}></AiOutlineClose>
        </button>
        <div className={styles.miniThumb}>
          <img src={image} alt={artist} className={styles.miniImg} />
        </div>
        <div className={styles.container}>
          <div className={styles.thumb}>
            <img src={image} alt={artist} className={styles.img} />
          </div>

          <div className={styles.infoBlock}>
            <h1 className={styles.title}>INFO</h1>
            <p className={styles.text}>{info}</p>

            <h1 className={styles.title}>WHEN</h1>
            <p className={styles.text}>{date}</p>
            <p className={styles.text}>{time} (Kyiv/Ukraine)</p>

            <h1 className={styles.title}>WHERE</h1>
            <p className={styles.text}>
              {city}, {country}
            </p>
            <p className={styles.text}>{venue}</p>

            <h1 className={styles.title}>WHO</h1>
            <p className={styles.text}>{artist}</p>

            {tickets?.length > 0 && (
              <>
                <h1 className={styles.title}>TICKETS</h1>
                {tickets.map((t, i) => (
                  <p key={i} className={styles.text}>
                    {t.type}: {t.min}-{t.max} {t.currency}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>

        <a
          href={moreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.moreInfo}
        >
          MORE FROM THIS AUTHOR
        </a>
      </div>
    </div>
  );
}
