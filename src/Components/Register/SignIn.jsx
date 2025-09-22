import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { login,currentUser } from "../../Redux/Auth/Action";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SignIn = () => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleSnackbarClose = (event, reason) => {
    setOpenSnackBar(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log("TOKEN IN SIGNIN", token);
  const { auth } = useSelector((store) => store);

  const [inputData, setInputData] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    console.log("handle submit");
    dispatch(login(inputData));
    setOpenSnackBar(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };
  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
    }
  }, [token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser]);
  return (
    <div>
      <div className="flex justify-center h-screen items-center">
        <div className="w-[30%] p-10 shadow-md bg-white">
          <form onSubmit={handleSubmit} className="space-y-5" action="">
            <div>
              <p className="mb-2">Email</p>
              <input
                type="email"
                className="border w-full p-2 outline-green-600 rounded-md"
                placeholder="Enter your email"
                onChange={handleChange}
                value={inputData.email}
                name="email"
              />
            </div>
            <div>
              <p className="mb-2">Password</p>
              <input
                type="password"
                className="border w-full p-2 outline-green-600 rounded-md"
                placeholder="Enter your password"
                onChange={handleChange}
                value={inputData.password}
                name="password"
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full"
                variant="contained"
                sx={{
                  bgcolor: "#00a884",
                  ":hover": { bgcolor: "rgba(38, 115, 229, 1)" },
                  padding: "0.5rem 0rem",
                }}
              >
                Sign In
              </Button>
            </div>
          </form>
          <div className="flex justify-center space-x-3 items-center mt-5">
            <p className="m-0">Create New Account</p>
            <Button
              variant="text"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Login Successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
