import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row p-3 m-5 border border-teal-500 justify-center items-center rounded-xl ">
        <div className="flex-1 justify-center flex flex-col p-4 text-center">
          <h2 className="text-2xl">Do you want to learn to code?</h2>
          <p className="text-gray-500 my-2">
            Visit the freeCodeCamp Youtube channel, it has high quality courses
          </p>
          <Button className="rounded-xl max-w-md w-44 mx-auto mt-3">
          <a
              href="https://www.youtube.com/@freecodecamp/videos"
              target="_blank"
              rel="noopener noreferrer"
          >
            Go now
          </a>
          </Button>
        </div>
        <div className="p-7">
          <a
            href="https://www.youtube.com/@freecodecamp/videos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="rounded-xl max-w-md"
              src="https://miro.medium.com/v2/resize:fit:3840/1*TKXSmO_vghw2G5aDRcf2Ww.png"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default CallToAction;
