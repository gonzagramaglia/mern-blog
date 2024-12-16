import { Navbar, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

const Header = () => {
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
      </Navbar>
    </>
  );
};

export default Header;
