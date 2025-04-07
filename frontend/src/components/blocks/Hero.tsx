import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
      <div className="relative overflow-hidden min-h-screen flex items-center justify-center py-24 lg:py-32">
        {/* Gradients */}
        <div
          aria-hidden="true"
          className="flex absolute -top-96 left-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-background/50 to-background blur-3xl w-[25rem] h-[44rem] rotate-[-60deg]" />
          <div className="bg-gradient-to-tl blur-3xl w-[90rem] h-[50rem] rounded-full origin-top-left -rotate-12 from-primary-foreground via-primary-foreground to-background" />
        </div>
        {/* Content */}
        <div className="relative z-10">
          <div className="container py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <div className="mt-5 max-w-2xl">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Finding Food, Figured Out
                </h1>
              </div>
              <div className="mt-5 max-w-3xl">
                <p className="text-xl text-muted-foreground">
                  Over 20 partner restaurants within and around SMU's campus. <br />
                  With more being added everyday, there's always something good to eat.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center">
                <Link to="/register">
                  <Button size={"lg"} className="bg-gradient-to-r from-blue-600 via-blue-400 to-purple-500">Get started</Button>
                </Link>
                <a href="#about">
                  <Button size={"lg"} variant={"outline"}>
                    Learn more
                  </Button>
                </a>
              </div>

  <section className="bg-background py-16">
  <div className="mx-auto max-w-5xl px-6">
    <div className="mx-auto mt-20 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 sm:gap-y-12">
      <img
      className="h-auto w-auto max-h-24 max-w-[200px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/subarashii.jpg"
      alt="Subarashii"
      />

      <img
      className="h-auto w-auto max-h-24 max-w-[200px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/logo%20bigger.PNG"
      alt="Khoon"
      />

      <img
      className="h-auto w-auto max-h-24 max-w-[200px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/logo-kuro_kare.png"
      alt="Kuro Kare"
      />

      <img
      className="h-auto w-auto max-h-20 max-w-[150px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/openkitchen.jpg"
      alt="Open Kitchen"
      />

      <img
      className="h-auto w-auto max-h-20 max-w-[150px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/1_5.jpg"
      alt="Triplets"
      />

      <img
      className="h-auto w-auto max-h-20 max-w-[150px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/koufu_0.png"
      alt="Koufu"
      />

      <img
      className="h-auto w-auto max-h-20 max-w-[150px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/pastaexpress.jpg"
      alt="Pasta Express"
      />

      <img
      className="h-auto w-auto max-h-24 max-w-[200px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/MasterLogoWithTM%28P%29%20highres-01.jpg"
      alt="1983"
      />

      <img
      className="h-auto w-auto max-h-24 max-w-[200px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/logo-break.jpg"
      alt="Braek"
      />

      <img
      className="h-auto w-auto max-h-24 max-w-[200px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/logo-flourish-bakery.jpg"
      alt="Flourish"
      />

      <img
      className="h-auto w-auto max-h-20 max-w-[150px] object-contain"
      src="https://maps.smu.edu.sg/sites/maps.smu.edu.sg/files/styles/max_650x650/public/location/kingkongcurry.jpg"
      alt="King Kong Curry"
      />
    </div>
  </div>
</section>
              

            </div>
          </div>
        </div>
      </div>
    );
  }
  