import SEARCH_ACTIONS from "actions/searchActions";
import { ExptyResults } from "components/shared/EmptyResults";
import Pagination from "components/shared/Pagination";
import React from "react";
import { useResultContext } from "../../../context/ResultsContextProvider";
import { Loading } from "../../shared/Loading";
import { Result } from "./Result";

export const Results = () => {
  const {
    results,
    toolState: { pagination },
    processing,
    handlePagination,
  } = useResultContext();
  if (processing[SEARCH_ACTIONS.LOAD_RESULTS].status) {
    return <Loading />;
  }
  return (
    <div className="space-y-6 sm:px-56 ">
      {results && results.length ? (
        results.map((result, index) => <Result key={index} result={result} />)
      ) : (
        <ExptyResults />
      )}
      <Pagination
        className="pagination-bar"
        currentPage={pagination.currentPage}
        totalCount={pagination.totalResults}
        pageSize={pagination.size}
        onPageChange={(page) => {
          handlePagination({ page });
        }}
      />
    </div>
  );
};
