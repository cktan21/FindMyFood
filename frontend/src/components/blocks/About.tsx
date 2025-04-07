
const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-24 lg:py-32 px-24">
      <div className="container flex flex-col gap-28">
      <div className="flex flex-col gap-7">
        <h1 className="text-4xl font-semibold lg:text-7xl">
            The fastest way to your next meal
        </h1>
        <p className="text-lg">
            No matter if it's break time, lunch time or I-really-need-a-coffee time, <br />
            browse menus, check queues, make payment and view order statuses all in one place.
        </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src="https://shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder"
            className="size-full max-h-96 rounded-2xl object-cover"
          />
          <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10">
            <p className="text-sm text-muted-foreground">Our mission</p>
            <p className="text-lg font-medium">
              Seamless Ordering. Smart Recommendations. Less Waiting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { About };
