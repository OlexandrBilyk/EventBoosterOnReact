import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEvents } from "./redux/events/eventsSlice";
import { useGetEventsQuery } from "./redux/events/eventsApi";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

export default function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetEventsQuery();
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState(null);
  const [keywordValue, setKeywordValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const maxNum = 49;

  useEffect(() => {
    console.log(data);

    if (data?._embedded?.events) {
      dispatch(setEvents(data._embedded.events));
    }
  }, [dispatch, data]);

  return (
    <>
      <Header
        keywordValue={keywordValue}
        setKeywordValue={setKeywordValue}
        countryValue={countryValue}
        setCountryValue={setCountryValue}
      />
      <Main
        onOpen={() => setIsShow(true)}
        setId={setId}
        keywordValue={keywordValue}
        countryValue={countryValue}
        maxNum={maxNum}
      />
      {isShow && <Modal id={id} onClose={() => setIsShow(false)} />}
    </>
  );
}
