import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Coffee, Utensils, Timer, BarChart4 } from 'lucide-react';

function LandingPage() {
  // FEATURE LIST
  const features = [
    { icon: Coffee, title: "Log Your Beans", description: "Track every bag of coffee you purchase, including roast date and origin." },
    { icon: Utensils, title: "Create Custom Recipes", description: "Design, refine, and save pour-over recipes for specific beans." },
    { icon: Timer, title: "Guided Brew Timer", description: "Use recipes in a step-by-step, timed guide to ensure perfect execution." },
    { icon: BarChart4, title: "View Your Stats", description: "Analyze your brew results with meaningful visualizations and statistics." },
  ];

  return (
    <div className="min-h-screen bg-cbg1 text-white flex flex-col items-center pt-16 pb-32 px-4">
      {/* HEADER */}
      <header className="text-center mb-12 max-w-xl">
        <h1 className="text-5xl font-extrabold mb-4 text-caccent2 tracking-tight">
          The Perfect Pour Starts Here.
        </h1>
        <p className="text-lg text-ctext mb-8">
          Tired of inconsistent pour-overs? We provide specialty coffee enthusiasts with the tools to log, track, and perfect every brew recipe.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup">
            <Button className="w-full sm:w-auto bg-caction hover:bg-chover text-lg font-bold py-6 px-8 rounded-xl shadow-lg transition-transform duration-200 hover:scale-[1.02]">
              Start Brewing Now
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" className="w-full sm:w-auto text-lg font-bold py-6 px-8 rounded-xl shadow-md border border-ctext/30 text-ctext bg-cbg3 hover:bg-cbg2">
              Log In
            </Button>
          </Link>
        </div>
      </header>

      {/* FEATURES */}
      <section className="w-full max-w-4xl pt-8">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">How We Elevate Your Brew</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-cbg2 p-6 rounded-xl shadow-xl border-t-4 border-caction/50 transition-all duration-300 hover:shadow-2xl hover:border-caction"
            >
              <feature.icon className="h-8 w-8 text-caction mb-3" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-ctext">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HIDDEN MOBILE FAB */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-cbg2 border-t border-cbg3 shadow-2xl md:hidden">
         <Link to="/signup">
            <Button className="w-full bg-caction hover:bg-chover text-lg font-bold">
              Sign Up / Log In
            </Button>
          </Link>
      </div>

    </div>
  );
}

export default LandingPage;