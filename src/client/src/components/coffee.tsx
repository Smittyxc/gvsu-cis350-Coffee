//Placeholder
import { BookOpen, Coffee, User } from 'lucide-react';

export function CoffeePage() {
    const navItems = [
        { name: 'Account', icon: User, href: '/account' },
        { name: 'Recipes', icon: BookOpen, href: '/recipes' },
        { name: 'Coffee', icon: Coffee, href: '/coffee' },
    ];

    return (
        <div> 
            <div className="flex flex-col h-full">
                <header className="p-4">
                    <h1 className="text-3xl font-bold">Coffee</h1>
                </header>
                {/* NAV BAR */}
                <footer className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-2xl border-t border-gray-100">
                    <div className="flex justify-around items-center h-full text-stone-500">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            
                            return (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    className="flex flex-col items-center justify-center h-full w-1/3 text-stone-300 hover:text-stone-500 transition-colors duration-200"
                                >
                                    <IconComponent className="w-6 h-6" />
                                    <span className="text-xs mt-1 font-semibold">{item.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </footer>
            </div>
        </div>
    )
}