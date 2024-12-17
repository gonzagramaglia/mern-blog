import { Link } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";

const SignUp = () => {
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
            <form className="flex flex-col gap-4">
              <div>
                <Label value="Your email" />
                <TextInput
                  type="text"
                  placeholder="Email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="">
                <Label value="Your username" />
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                  name="username"
                />
              </div>
              <div className="">
                <Label value="Your password" />
                <TextInput
                  type="text"
                  placeholder="Password"
                  id="password"
                  name="password"
                />
              </div>
              <Button
                className="bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-3">
              <span>Already have an account?</span>
              <Link to="/sign-in" className="text-indigo-500">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
