import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, Link } from "react-router-dom";
import { getAllJobs } from "../../features/search/searchSlice";
import styled from "styled-components";
import JobContainer from "../../components/JobContainer";
import SearchContainer from "../../components/SearchContainer";
import { changePage } from "../../features/search/searchSlice";
const AllJobs = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, jobs, numberOfPages } = useSelector(
    (state) => state.search
  );
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getAllJobs());
    }
  }, []);

  const handlePageChange = (page) => {
    dispatch(changePage(page));
    dispatch(getAllJobs());
  };

  if (!user) {
    return history.push("/register");
  }

  return (
    <Wrapper>
      <h1 className="title">All Jobs</h1>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="search-container">
            <SearchContainer />
          </div>
          <div className="jobs-container">
            <JobContainer jobs={jobs} />
          </div>
          <div className="page-container">
            {numberOfPages > 1 &&
              Array.from({ length: numberOfPages }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => {
                      handlePageChange(page);
                    }}
                  >
                    {page}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  width: 100%;
  display: inline-block;
  .title {
    width: 100%;
    font-size: 2rem;
    font-weight: 700;
    text-transform: capitalize;
    margin: 3rem auto;
    padding-left: 3rem;
    border-bottom: 1px solid #ccc;
  }
  .jobs-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 1.5rem;
  }
  .search-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
  }
  .page-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem;
  }
`;

export default AllJobs;
