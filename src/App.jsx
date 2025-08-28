import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEvents } from "./redux/events/eventsSlice";
import { useGetEventsQuery } from "./redux/events/eventsApi";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

export default function App() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useGetEventsQuery();

  useEffect(() => {
    if (data?._embedded?.events) {
      console.log(data._embedded.events);
      dispatch(setEvents(data._embedded.events));
    }
  }, [dispatch, data]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}
