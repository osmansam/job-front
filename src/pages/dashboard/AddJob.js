import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../../components/FormRow";
import FormRowSelect from "../../components/FormRowSelect";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { handleChange, clearValues } from "../../features/job/jobSlice";
import styled from "styled-components";

import {
  createJob,
  updateJob,
  getAllJobs,
  deleteJob,
} from "../../features/job/jobSlice";
const AddJob = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    jobs,
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    status,
    jobTypeOptions,
    statusOptions,
    isEditing,
    editId,
  } = useSelector((state) => state.job);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateJob({ editId, position, company, jobLocation, jobType, status })
      );
    } else {
      await dispatch(
        createJob({ position, company, jobLocation, jobType, status })
      );
      dispatch(getAllJobs());
    }
  };
  React.useEffect(() => {
    dispatch(getAllJobs());
  }, []);
  const handleCancel = () => {
    dispatch(clearValues());
    history.push("/dashboard");
  };
  const handleJobChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <Wrapper>
      <div className="add-job">
        <h1 className="title">{isEditing ? "Edit Job" : "Add Job"}</h1>
        <form onSubmit={handleSubmit}>
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobChange}
          />
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobChange}
          />

          <FormRow
            type="text"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobChange}
          />
          <FormRowSelect
            name="jobType"
            value={jobType}
            defaultVal={jobType}
            handleChange={handleJobChange}
            list={jobTypeOptions}
          />
          <FormRowSelect
            name="status"
            value={status}
            defaultValue={status}
            handleChange={handleJobChange}
            list={statusOptions}
          />

          <button type="submit" className="btn btn-primary">
            {isEditing ? "Edit Job" : "Add Job"}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              dispatch(getAllJobs());
            }}
          >
            Get All Jobs
          </button>
        </form>
        {jobs &&
          jobs.map((job) => {
            return (
              <div key={job._id}>
                <div
                  onClick={() => {
                    history.push(`/singleJob/${job._id}`);
                  }}
                >
                  <h1>{job.position}</h1>
                  <h2>{job.company}</h2>
                  <h3>{job.jobLocation}</h3>
                  <h4>{job.jobType}</h4>
                  <h5>{job.status}</h5>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch(updateJob(job._id));
                    dispatch(getAllJobs());
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={async () => {
                    await dispatch(deleteJob(job._id));
                    dispatch(getAllJobs());
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .add-job {
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
  .title {
    margin-top: 2rem;
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 2rem;
    color: grey;
  }
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: left;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }
  button {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  .btn-primary {
    background-color: grey;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    cursor: pointer;
  }
`;
export default AddJob;
