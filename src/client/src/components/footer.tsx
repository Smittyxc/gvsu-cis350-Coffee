import { Link, useLocation, useNavigate } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"

import { Coffee, Utensils, Plus, Home, ChevronLeft, CirclePlus, User } from 'lucide-react';

interface DynamicButtonConfig {
  Icon: React.ElementType;
  text: string;
  link: string;
  value: string;
}

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // ACTIVE TAB DETERMINATION
  const getCurrentTabValue = (path: string): string => {
    switch (path) {
      case '/viewcoffees':
        return 'coffee';
      case '/recipes':
        return 'recipes';
      case '/recipes/recipeNew':
        return 'dynamic-fab';
      case '/brewresults':
        return 'brews';
      case '/summary':
        return 'summary-new';
      case '/coffee/new':
        return 'dynamic-fab';
      default:
        if (path.startsWith('/recipes/') && path !== '/recipes' && path !== '/recipes/recipeNew') {
          return 'dynamic-fab';
        }
        else if (path.startsWith('/coffee/') && path.endsWith('/edit')) {
          return 'dynamic-fab';
        }
        return ''; 
    }
  };

  const activeTabValue = getCurrentTabValue(currentPath);

  // FAB CONFIG
  const getDynamicButtonConfig = (path: string): DynamicButtonConfig | null => {
    switch (path) {
      case '/viewcoffees':
        return {
          Icon: Plus,
          text: 'Add Coffee',
          link: '/coffee/new',
          value: 'add-coffee',
        };
      case '/coffee/new':
        return {
          Icon: ChevronLeft,
          text: 'Back',
          link: '/viewcoffees',
          value: 'back-coffee-new',
        };
      case '/recipes':
        return {
          Icon: Plus,
          text: 'Search',
          link: '/recipes/recipeNew',
          value: 'search-recipes',
        };
      case '/recipes/recipeNew':
        return {
          Icon: ChevronLeft,
          text: 'Back',
          link: '/recipes',
          value: 'back-recipe-new',
        };
      case '/brewresults':
        return {
          Icon: Home,
          text: 'Dashboard',
          link: '/summary',
          value: 'view-stats',
        };
      case '/summary':
        return {
          Icon: ChevronLeft,
          text: 'Back',
          link: 'history-back',
          value: 'back-action-page',
        };
      default:
        if (path.startsWith('/recipes/') && path !== '/recipes' && path !== '/recipes/recipeNew') {
          return {
            Icon: ChevronLeft,
            text: 'Back',
            link: '/recipes',
            value: 'back-recipe-view',
          };
        }
        else if (path.startsWith('/coffee/') && path.endsWith('/edit')) {
          return {
            Icon: ChevronLeft,
            text: 'Back',
            link: '/viewcoffees',
            value: 'back-coffee-edit',
          };
        }
        return {
          Icon: Home,
          text: 'Home',
          link: '/viewcoffees',
          value: 'home-default',
        };
    }
  };

  const dynamicButton = getDynamicButtonConfig(currentPath);
  
  const FabContent = dynamicButton && (
    <Button
      key={dynamicButton.value}
      data-active={activeTabValue === 'dynamic-fab'}
      className={`
                min-w-16 min-h-16 rounded-full

                transition-all duration-300 ease-out transform transition-colors duration-200
                text-white border-4 border-cbg2

                bg-cfab hover:bg-chover

                data-[active=true]:scale-[0.85] data-[active=true]:bg-cbg3 data-[active=true]:hover:bg-chover
                data-[active=true]:opacity-0 transition-opacity duration-300
                 
                ${activeTabValue === 'dynamic-fab' ? 'fab-spin-anim' : 'fab-zoom-anim'}
                 
                flex flex-col items-center justify-center p-0`}
    >
      <dynamicButton.Icon className="h-7 w-7 transition-opacity duration-300" />
    </Button>
  );

  return (
    <div className="fixed flex h-24 bottom-0 z-30 w-full"> 
      
      {/* FOOTER BAR */}
      <div className="absolute w-full h-16 bottom-0 bg-cbg2 shadow-2xl border-t-3 border-cbg2 flex items-start justify-center">
        
        {/* TABS */}
        <Tabs value={activeTabValue} className="w-full h-full"> 
          <TabsList className="w-full h-full p-0 flex justify-between bg-transparent">
            
            {/* LEFT */}
            <div className="flex w-5/12 justify-around h-full">
                {/* COFFEES */}
                <Link to='/viewcoffees' className="flex-grow h-full flex items-center justify-center">
                  <TabsTrigger
                    value='coffee'
                    className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors" 
                  >
                    <Coffee className="h-5 w-5 mb-0.5" />
                    <p className="text-xs font-semibold">Coffees</p>
                  </TabsTrigger>
                </Link>
                
                {/* RECIPES */}
                <Link to='/recipes' className="flex-grow h-full flex items-center justify-center">
                  <TabsTrigger
                    value='recipes'
                    className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors"
                  >
                    <Utensils className="h-5 w-5 mb-0.5" />
                    <p className="text-xs font-semibold">Recipes</p>
                  </TabsTrigger>
                </Link>
            </div>
            
            {/* FAB */}
            <div className="w-2/12 h-full">
            </div>

            {/* RIGHT */}
            <div className="flex w-5/12 justify-around h-full">
                {/* BREWS */}
                <Link to='/brewresults' className="flex-grow h-full flex items-center justify-center">
                  <TabsTrigger
                    value='brews'
                    className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors"
                  >
                    <CirclePlus className="h-5 w-5 mb-0.5" />
                    <p className="text-xs font-semibold">Log Brew</p>
                  </TabsTrigger>
                </Link>

                {/* ACCOUNT */}
                <Link to='/account' className="flex-grow h-full flex items-center justify-center">
                  <TabsTrigger
                    value='summary-new'
                    className="rounded-none h-full w-full bg-cbg2 text-ctext hover:bg-cbg3 data-[state=active]:text-cactive data-[state=active]:bg-cbg3 ring-none outline-none flex flex-col justify-center transition-colors"
                  >
                    <User className="h-5 w-5 mb-0.5" />
                    <p className="text-xs font-semibold">Account</p>
                  </TabsTrigger>
                </Link>
            </div>
          </TabsList>
        </Tabs>
      </div>

      {/* FAB */}
      {dynamicButton && (
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-5 z-50 transition-transform hover:scale-105"
        >
          {dynamicButton.link === 'history-back' ? (
            <div onClick={() => navigate(-1)} className="cursor-pointer">
              {FabContent}
            </div>
          ) : (
            <Link to={dynamicButton.link}>
              {FabContent}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default Footer