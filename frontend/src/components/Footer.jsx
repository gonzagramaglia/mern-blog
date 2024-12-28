import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub } from "react-icons/bs";

const TheFooter = () => {
  return (
    <>
      <Footer container className="border border-t-8 border-indigo-300">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
              <Link
                to="/"
                className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
              >
                <span className="px-2 py-1 mr-1 bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-400 rounded-lg text-white">
                  Gonza's
                </span>
                Blog
              </Link>
            </div>
            <div className="grid grid-cols-2 mt-4 ">
              <div>
                <Footer.Title title="Showcase" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://gonza.gr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Frontend Portfolio
                  </Footer.Link>
                  <Footer.Link
                    href="https://www.youtube.com/@gonzagramaglia/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Backend Portfolio
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div className="ml-auto">
                <Footer.Title title="Social" />
                <Footer.LinkGroup col>
                  <Footer.Link
                    href="https://www.github.com/gonzagramaglia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </Footer.Link>
                  <Footer.Link href="https://www.linkedin.com/in/gonzagramaglia">
                    LinkedIn
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright
              by="Gonza's blog"
              year={new Date().getFullYear()}
            />
            <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
              <Footer.Icon
                href="https://github.com/gonzagramaglia"
                icon={BsGithub}
              />
              <Footer.Icon
                href="https://linkedin.com/in/gonzagramaglia"
                icon={BsLinkedin}
              />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default TheFooter;
