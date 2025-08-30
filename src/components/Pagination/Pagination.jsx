import { useEffect, useState } from "react";
import { useLazyGetEventsQuery } from "../../redux/events/eventsApi";
import { useDispatch } from "react-redux";
import { setEvents } from "../../redux/events/eventsSlice";
import styles from "./Pagination.module.scss";

export default function Pagination({ keywordValue, countryValue, maxNum }) {
  const [btns, setBtns] = useState([]);
  const [minNum, setMinNum] = useState(1);

  const [getEvents] = useLazyGetEventsQuery();
  const dispatch = useDispatch();

  async function handleClick(e) {
    const value = Number(e.target.textContent);

    setBtns((prev) =>
      prev.map((el) => ({
        ...el,
        active: el.text === value,
      }))
    );

    if (value + 1 === btns[btns.length - 1].text) return;

    if (value === btns[btns.length - 2].text) {
      setBtns((prev) => {
        const newBtns = prev.slice(1, -1);
        newBtns.push({ text: value + 1, active: false });
        newBtns.push(prev[prev.length - 1]);
        return newBtns.map((el) => ({
          ...el,
          active: el.text === value,
        }));
      });
    } else if (value === btns[0].text && value !== 1) {
      setBtns((prev) => {
        const newBtns = [...prev];
        newBtns.pop();
        newBtns.unshift({ text: value - 1, active: false });
        newBtns.push(prev[prev.length - 1]);

        const filteredBtns = newBtns.filter(
          (el) => el.text !== btns[btns.length - 2].text
        );

        return filteredBtns.map((el) => ({
          ...el,
          active: el.text === value,
        }));
      });
    }
    setMinNum(btns[0].text);

    const events = await getEvents({
      page: value,
      keyword: keywordValue,
      countryCode: countryValue,
    });
    console.log(events);

    dispatch(setEvents(events.data._embedded.events));
  }

  async function handlePrev() {
    setBtns([
      { text: 1, active: true },
      { text: 2, active: false },
      { text: 3, active: false },
      { text: 4, active: false },
      { text: 5, active: false },
      { text: maxNum, active: false },
    ]);
    setMinNum(1);

    const events = await getEvents({
      page: 1,
      keyword: keywordValue,
      countryCode: countryValue,
    });
    dispatch(setEvents(events.data._embedded.events));
  }

  useEffect(() => {
    const arr = [
      { text: 1, active: true },
      { text: 2, active: false },
      { text: 3, active: false },
      { text: 4, active: false },
      { text: 5, active: false },
      { text: maxNum, active: false },
    ];
    setBtns(arr);
  }, []);

  return (
    <ul className={styles.list}>
      {minNum >= 3 && (
        <li className={styles.item}>
          <button type="button" onClick={handlePrev} className={styles.btn}>
            back
          </button>
        </li>
      )}
      {btns.map((el, i) => (
        <li key={i} className={styles.item}>
          {el.text === maxNum && btns[i - 1]?.text !== maxNum - 1 && (
            <span>...</span>
          )}

          <button
            type="button"
            onClick={handleClick}
            className={`${styles.btn} ${el.active ? styles.active : ""}`}
          >
            {el.text}
          </button>
        </li>
      ))}
    </ul>
  );
}
