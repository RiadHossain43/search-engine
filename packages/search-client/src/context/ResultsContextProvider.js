import useActions from "hooks/useActions";
import useQuery from "hooks/useQuery";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { search } from "services/searchService";
import { asynchronously } from "utils/asynchronous";
import SEARCH_ACTIONS from "actions/searchActions";
export const ResultContext = createContext();
export const ResultsContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const {
    query,
    toolState,
    getQuery,
    handlePagination,
    handleSearch,
    updatePagination,
    updateSearch,
  } = useQuery();
  let { processing, dispatch } = useActions([
    { action: SEARCH_ACTIONS.LOAD_RESULTS, status: true },
  ]);
  const loadResults = useCallback(async (type) => {
    dispatch({
      [SEARCH_ACTIONS.LOAD_RESULTS]: { status: true, error: false, id: null },
    });
    const [, response] = await asynchronously(search({ query: getQuery() }));
    const [, data] = await asynchronously(response.json());
    setResults(data.results);
    updatePagination(data.pagination);
    dispatch({
      [SEARCH_ACTIONS.LOAD_RESULTS]: {
        status: false,
        error: false,
        id: null,
      },
    });
  }, []);
  useEffect(() => {
    loadResults();
  }, [query, loadResults]);
  return (
    <ResultContext.Provider
      value={{
        loadResults,
        results,
        handleSearch,
        handlePagination,
        updatePagination,
        updateSearch,
        toolState,
        processing,
        dispatch,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
