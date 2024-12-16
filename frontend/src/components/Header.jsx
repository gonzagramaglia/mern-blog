import { Navbar, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 rounded-lg text-white">
            Gonza's
          </span>{" "}
          Blog
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search"
            icon={AiOutlineSearch}
            className="hidden lg:inline"
            color="blue"
            required
          />
        </form>
        <Button color="gray" className="lg:hidden" pill>
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button color="indigo"> Sign In </Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"}>
            <Link to="/" as={"div"}>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"}>
            <Link to="/about" as={"div"}>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/projects"}>
            <Link to="/projects" as={"div"}>
              Projects
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Header;
