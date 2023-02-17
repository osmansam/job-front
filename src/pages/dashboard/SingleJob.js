import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams, Link } from "react-router-dom";

import { getJob } from "../../features/job/jobSlice";

const SingleJob = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, job } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getJob(id));
  }, []);
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="job-container">
      <h1>{job.position}</h1>
      <h2>{job.company}</h2>
      <h3>{job.jobLocation}</h3>
      <h4>{job.jobType}</h4>
      <h5>{job.status}</h5>
    </div>
  );
};
export default SingleJob;
