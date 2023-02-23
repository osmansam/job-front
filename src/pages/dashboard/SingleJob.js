import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Job from "../../components/Job";
import { getJob } from "../../features/job/jobSlice";
import axios from "axios";
import { createCandidate, jobCandidates } from "../../features/user/userSlice";
import styled from "styled-components";
const SingleJob = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, job } = useSelector((state) => state.job);
  const { user, candidates } = useSelector((state) => state.user);
  const [isCandidate, setIsCandidate] = useState(false);
  const checkCandidate = async (id, user) => {
    const res = await axios.post(
      `http://localhost:3000/api/v1/candidate/check`,
      { job: id }
    );

    if (res.data.isCandidate) {
      setIsCandidate(true);
    }
  };
  useEffect(() => {
    dispatch(getJob(id));
    dispatch(jobCandidates(id));
    setTimeout(() => {
      console.log("====================================");
      console.log(candidates[0].user);
      console.log("====================================");
    }, 2000);

    if (user) {
      checkCandidate(id, user);
    }
  }, []);

  if (!user) {
    return history.push("/register");
  }
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="job-container">
      <Job job={job} />
      {user.role !== "employer" && !isCandidate && (
        <button
          onClick={() => {
            dispatch(createCandidate({ job: id, user: user.userId }));
            setIsCandidate(true);
          }}
        >
          Apply
        </button>
      )}
      {user.role !== "employer" && isCandidate && <h2>Applied</h2>}
    </div>
  );
};
export default SingleJob;
