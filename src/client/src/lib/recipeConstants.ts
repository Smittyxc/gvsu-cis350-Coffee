import { BookOpen, User, Coffee } from 'lucide-react';

// PLACEHOLDER ICONS
const Milk = '/icons/milk.svg';
const ConicalFlask = '/icons/flask-conical.svg';
const RoundFlask = '/icons/flask-round.svg';

const DefaultCoffee = '/icons/coffee.svg';
//const RegularCup = '/icons/icon-72x72.png';
const RegularCup = DefaultCoffee;
const Espresso = ConicalFlask;
const Iced = RoundFlask;

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
export const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-700 bg-stone-200";