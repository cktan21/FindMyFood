
const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 lg:py-32 px-24">
      <div className="container flex flex-col gap-28">
      <div className="flex flex-col gap-7">
        <h1 className="text-4xl font-semibold lg:text-7xl">
            Making food selection an ease for everyone
        </h1>
        <p className="text-lg">
            We aim to be the one stop platform for students to be able to view and order food around school right from the flexibility of an app
        </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">OUR MISSION</p>
            <p className="text-lg font-medium">
                We want to be the go to platform that allows you to make food decisions effortlessly
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };
