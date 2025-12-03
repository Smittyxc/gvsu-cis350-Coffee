import { BookOpen, User, Coffee, FlaskRound, FlaskConical} from 'lucide-react';
// import { c } from 'node_modules/vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf';

// PLACEHOLDER ICONS
const Milk = '/icons/milk.svg';
const ConicalFlask = '/icons/flask-conical.svg';
const RoundFlask = '/icons/flask-round.svg';

/*
const DefaultCoffee = '/icons/coffee.svg';
//const RegularCup = '/icons/icon-72x72.png';
const RegularCup = DefaultCoffee;
const Espresso = ConicalFlask;
const Iced = RoundFlask;
*/

const DefaultCoffee = Coffee;
const RegularCup = Coffee;
const Espresso = FlaskConical;
const Iced = FlaskRound;

export const icons = {
    DefaultCoffee,
    RegularCup,
    Espresso,
    Iced,
    
    BookOpen,
    User,
    Coffee,

    Milk,
    ConicalFlask,
    RoundFlask,
};

export const baseButton = "px-4 py-2 rounded-lg font-semibold transition-colors duration-150";
export const primaryButton = `${baseButton} bg-yellow-700 text-white hover:bg-yellow-800`;
export const secondaryButton = `${baseButton} bg-gray-200 text-gray-800 hover:bg-gray-300`;
export const inputStyle = "w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:cbg3 text-ctext bg-cbg2";