export const HeroSection = () => {
    return (
        <section className="relative h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('/images/herobg.png')"}}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          </div>
        </section>
      );
    }