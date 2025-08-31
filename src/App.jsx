import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEvents } from "./redux/events/eventsSlice";
import { useGetEventsQuery } from "./redux/events/eventsApi";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Modal from "./components/Modal/Modal";

export default function App() {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);
  const [id, setId] = useState(null);
  const [keywordValue, setKeywordValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const { data, isLoading, error } = useGetEventsQuery({
    page: 1,
    keyword: keywordValue,
    countryCode: countryValue,
  });
  const [maxNum, setMaxNum] = useState(49);

  useEffect(() => {
    console.log();

    if (data?._embedded?.events) {
      dispatch(setEvents(data._embedded.events));
      if (data?.page?.totalPages) {
        if (data?.page?.totalPages > 49) {
          setMaxNum(49);
        } else {
          setMaxNum(data.page.totalPages);
        }
      }
    }
  }, [dispatch, data, keywordValue, countryValue]);

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
