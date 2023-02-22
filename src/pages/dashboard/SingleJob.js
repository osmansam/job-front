import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory, useParams, Link } from "react-router-dom";
import Job from "../../components/Job";
import { getJob } from "../../features/job/jobSlice";

const SingleJob = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, job } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getJob(id));
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
    </div>
  );
};
export default SingleJob;
