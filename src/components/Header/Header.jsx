import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";
import { useLazyGetEventsQuery } from "../../redux/events/eventsApi";
import { useDispatch } from "react-redux";
import { setEvents } from "../../redux/events/eventsSlice";
import styles from "./Header.module.scss";

export default function Header({
  keywordValue,
  setKeywordValue,
  countryValue,
  setCountryValue,
}) {
  const dispatch = useDispatch();
  const [getEvents] = useLazyGetEventsQuery();

  useEffect(() => {
    async function updateEvents() {
      const events = await getEvents({
        keyword: keywordValue,
        countryCode: countryValue,
      });

      const currentEvents = events.data._embedded.events;

      dispatch(setEvents(currentEvents));
    }

    updateEvents();
  }, [keywordValue, countryValue]);

  return (
    <header className={styles.header}>
      <div className="container">
        <a href="/" className={styles.logo}>
          <img src="/icons/logo.svg" alt="logo" className={styles.logoIcon} />
        </a>
        <h1 className={styles.title}>FIND BEST EVENTS AROUND THE WORLD</h1>
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Start searching"
            className={styles.input}
            onChange={(e) => setKeywordValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter country"
            className={styles.input}
            onChange={(e) => setCountryValue(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
