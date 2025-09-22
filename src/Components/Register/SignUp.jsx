import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { register,currentUser } from "../../Redux/Auth/Action";
import { useSelector } from "react-redux";

const SignUp = () => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
    console.log("TOKEN IN SIGNUP",token)
  const {auth}=useSelector((store)=>store);
  const handleSnackbarClose = (event, reason) => {
    setOpenSnackBar(false);
  };
  const [inputData, setInputData] = React.useState({
    full_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputData);
    console.log("handle submit");
    dispatch(register(inputData));
    setOpenSnackBar(true);
  };
  const handleChange = (e) => {
    const {name, value} = e.target;
    setInputData({ ...inputData, [name]: value });
    // console.log(name,value);
  };
  useEffect(() => {
    if (token) {
      dispatch(currentUser(token));
    }
  },[token]);

  useEffect(() => {
    if (auth.reqUser?.full_name) {
      navigate("/");
    }
  }, [auth.reqUser]);
  return (
    <div>
      <div>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="w-[30%] p-10 shadow-md bg-white">
            <form onSubmit={handleSubmit} className="space-y-5" action="">
              <div>
                <p className="mb-2">User Name</p>
                <input
                  className="py-2 px-3 outline w-full outline-green-600 rounded-md border-1"
                  type="text"
                  placeholder="Enter your user name"
                  name="full_name"
                  onChange={(e) => handleChange(e)}
                  value={inputData.full_name}
                />
              </div>
              <div>
                <p className="mb-2">Email</p>
                <input
                  className="py-2 px-3 outline w-full outline-green-600 rounded-md border-1"
                  type="text"
                  placeholder="Enter your email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  value={inputData.email}
                />
              </div>
              <div>
                <p className="mb-2">Password</p>
                <input
                  className="py-2 px-3 outline w-full outline-green-600 rounded-md border-1"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={inputData.password}
                />
              </div>

              {/* <div>
                <Button
                  type="submit"
                  className="w-full"
                  variant="contained"
                  onChange={(e) => handleChange(e)}
                  value={inputData.email}
                />
              </div> */}

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  variant="contained"
                  sx={{ bgcolor: "#00a884", ":hover": { bgcolor: "rgba(38, 115, 229, 1)" }, padding: "0.5rem 0rem" }}
                >
                  Sign Up
                </Button>
              </div>
            </form>
            <div className="flex justify-center space-x-3 items-center mt-5">
              <p className="m-0">Already have an account?</p>
              <Button
                variant="text"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign In
              </Button>
            </div>
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
          Your account has been created successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
