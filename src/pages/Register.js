import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormRow from "../components/FormRow";
import { registerUser, loginUser } from "../features/user/userSlice";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const [isMember, setIsMember] = React.useState(false);

  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember, // true = login, false = register
  };
  const [values, setValues] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      setValues({ ...values, isMember });
      return isMember;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = values;
    if (isMember) {
      if (!email || !password) {
        toast.error("Please fill out all fields");
        return;
      }
      dispatch(loginUser({ email, password }));
      setValues(initialState);
    }
    if (!isMember) {
      if (!name || !email || !password) {
        toast.error("Please fill out all fields");
        return;
      }
      dispatch(registerUser({ name, email, password }));
      setValues(initialState);
      setIsMember(true);
    }
  };
  React.useEffect(() => {
    if (user) {
      setTimeout(() => {
        history.push("/addjob");
      }, 500);
    }
  }, [user]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>{isMember ? "Login" : "Register"}</h2>
        {!isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText="Name"
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText="Email"
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText="Password"
        />
        <button type="submit" className="btn btn-primary">
          {isMember ? "Login" : "Register"}
        </button>
        <p>
          {isMember ? "Need to register?" : "Already a member?"}
          <button type="button" onClick={toggleMember}>
            {isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
