const About = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center mb-10">
        <div className="max-w-2xl mx-auto p-3 text-center">
          <div>
            <h1 className="text-3xl font-semibold text-center my-7">
              About Gonza
            </h1>
            <div className="text-md text-gray-500 flex flex-col gap-6">
              <p>
                Gonza is a developer from Cordoba Capital who wants to help
                build everything that still needs to be built. One block of code
                at a time.
              </p>
              <img
                className="w-full"
                src="https://statics.memondo.com/p/99/ccs/2020/07/CC_2761662_084182c4a6cb4c18ad9ba27bce5af599_otros_un_hombre_agradecido.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
