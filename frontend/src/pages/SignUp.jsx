import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setErrorMessage(null);
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);

        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (err) {
      setLoading(false);

      return setErrorMessage(err.message);
    }
  };
  return (
    <>
      <div className="min-h-screen mt-20 ">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* Left side */}
          <div className="flex-1">
            <Link to="/" className=" text-4xl font-bold dark:text-white">
              <span className="px-2 mr-1 py-1 bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 rounded-lg text-white">
                Gonza's
              </span>
              Blog
            </Link>
            <p className="text-sm mt-5">
              This is a demo project. You can sign up with your email or with
              Google.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your email" />
                <TextInput
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your username" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Your password" />
                <TextInput
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-3">
              <span>Already have an account?</span>
              <Link to="/sign-in" className="text-indigo-500">
                Sign In
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
