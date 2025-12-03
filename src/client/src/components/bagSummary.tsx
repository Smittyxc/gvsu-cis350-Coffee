import React, { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { useAuth } from "@/context/AuthContext.tsx"
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip,
  ResponsiveContainer 
} from 'recharts';

// DATA INTERFACES

interface CoffeeBag {
  id: number;
  name: string;
  weightTotal: number;
  summaryNotes: string;
}

interface BrewSession {
  id: number;
  bagId: number;
  rating: number; 
  date: string;
  brewMethod: string;
  brewTime: number;
  weightUsed: number;
  temperatureF: number;
  flavorProfile: {
    acidity: number;
    clarity: number;
    bitterness: number;
    sweetness: number;
    body: number;
  };
  notes: string[];
}

// WHAT WILL ACTUALLY BE RENDERED
interface CalculatedBagData extends CoffeeBag {
  averageRating: number;
  bagsLogged: number;
  firstUsedDate: string | null;
  lastUsedDate: string | null;
  lastUsedDaysAgo: number;
  weightUsedTotal: number;
  weightUsedAverage: number;
  weightRemaining: number;
  mostUsedMethod: string;
  averageBrewTime: number;
  averageTemperatureF: number;
  averageFlavorProfile: BrewSession['flavorProfile'];
  totalNotes: string[];
}

// URL PARAMS

interface BagParams {
  bagId: string;
  [key: string]: string | undefined 
}

// FORMATTING CONSTANTS

const TABLE_ROW_BORDER = 'border-b border-cbg3';
const TABLE_CELL_LEFT = 'py-2 text-ctext';
const TABLE_CELL_RIGHT = 'py-2 text-right font-semibold';

// MM-DD-YYYY PARSING

// CONVERTS MM-DD-YYYY STRING INTO A DATE OBJECT
const parseMDY = (dateStr: string): Date => {
    // Splits 'MM-DD-YYYY' into [MM, DD, YYYY].
    const parts = dateStr.split('-');
    // Recombines into 'YYYY/MM/DD' format which is universally parsed correctly by Date.
    return new Date(`${parts[2]}/${parts[0]}/${parts[1]}`);
};

// CALCULATIONS

const calculateBagData = (bag: CoffeeBag, sessions: BrewSession[]): CalculatedBagData => {
  const bagsLogged = sessions.length;

  if (bagsLogged === 0) {
    // Return defaults if no sessions exist.
    return {
      ...bag,
      averageRating: 0,
      bagsLogged: 0,
      firstUsedDate: null,
      lastUsedDate: null,
      lastUsedDaysAgo: 0,
      weightUsedTotal: 0,
      weightUsedAverage: 0,
      weightRemaining: bag.weightTotal,
      mostUsedMethod: 'N/A',
      averageBrewTime: 0,
      averageTemperatureF: 0,
      averageFlavorProfile: { acidity: 0, clarity: 0, bitterness: 0, sweetness: 0, body: 0 },
      totalNotes: [],
    };
  }

  // AGGREGATES
  const totalRating = sessions.reduce((sum, s) => sum + s.rating, 0);
  const totalBrewTime = sessions.reduce((sum, s) => sum + s.brewTime, 0);
  const totalTemperature = sessions.reduce((sum, s) => sum + s.temperatureF, 0);
  const weightUsedTotal = sessions.reduce((sum, s) => sum + s.weightUsed, 0);
  const totalNotes = sessions.flatMap(s => s.notes).filter(n => n.trim() !== '');

  // FLAVOR PROFILE
  const flavorSum = sessions.reduce(
    (acc, s) => ({
      acidity: acc.acidity + s.flavorProfile.acidity,
      clarity: acc.clarity + s.flavorProfile.clarity,
      bitterness: acc.bitterness + s.flavorProfile.bitterness,
      sweetness: acc.sweetness + s.flavorProfile.sweetness,
      body: acc.body + s.flavorProfile.body,
    }),
    { acidity: 0, clarity: 0, bitterness: 0, sweetness: 0, body: 0 }
  );

  // AVERAGES
  const averageRating = parseFloat((totalRating / bagsLogged).toFixed(1));
  const averageBrewTime = Math.round(totalBrewTime / bagsLogged);
  const averageTemperatureF = Math.round(totalTemperature / bagsLogged);
  const weightUsedAverage = parseFloat((weightUsedTotal / bagsLogged).toFixed(1));
  const weightRemaining = bag.weightTotal - weightUsedTotal;
  const averageFlavorProfile = {
    acidity: parseFloat((flavorSum.acidity / bagsLogged).toFixed(1)),
    clarity: parseFloat((flavorSum.clarity / bagsLogged).toFixed(1)),
    bitterness: parseFloat((flavorSum.bitterness / bagsLogged).toFixed(1)),
    sweetness: parseFloat((flavorSum.sweetness / bagsLogged).toFixed(1)),
    body: parseFloat((flavorSum.body / bagsLogged).toFixed(1)),
  };

  // DATES
  const sortedSessions = sessions.sort((a, b) =>
    parseMDY(a.date).getTime() - parseMDY(b.date).getTime()
  );

  const firstUsedDate = sortedSessions[0].date;
  const lastUsedDate = sortedSessions[sortedSessions.length - 1].date;

  const today = new Date();
  const lastUsedDateTime = parseMDY(lastUsedDate).getTime();
  const diffTime = Math.abs(today.getTime() - lastUsedDateTime);
  const lastUsedDaysAgo = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Days ago

  // MOST USED BREW METHOD
  const methodCounts: Record<string, number> = {};
  sessions.forEach(s => {
    methodCounts[s.brewMethod] = (methodCounts[s.brewMethod] || 0) + 1;
  });
  const mostUsedMethod = Object.entries(methodCounts).sort(([, countA], [, countB]) => countB - countA)[0]?.[0] || 'N/A';

  return {
    ...bag,
    averageRating,
    bagsLogged,
    firstUsedDate,
    lastUsedDate,
    lastUsedDaysAgo,
    weightUsedTotal,
    weightUsedAverage,
    weightRemaining,
    mostUsedMethod,
    averageBrewTime,
    averageTemperatureF,
    averageFlavorProfile,
    totalNotes,
  };
};

// DATA FETCHING HOOK

const useCoffeeBagData = (bagId: number) => {
  const [bag, setBag] = useState<CalculatedBagData | null>(null); 
  const [bestBrew, setBestBrew] = useState<BrewSession | null>(null);
  const [loading, setLoading] = useState(true);

  const { session } = useAuth();

  useEffect(() => {
    setLoading(true);
    // API
    const fetchBrews = async () => {
          try {
          const token = session?.access_token;

          await fetch("http://localhost:5000/api/brew/" + bagId, {
          headers: {
              Authorization: `Bearer ${token ?? ""}`,
          },

          

          }).then(resp => {
            if (!resp.ok) return resp.text().then(msg => { throw new Error(msg) });
            return resp.json();

          }).then(data => {

            return Promise.all([data, fetch("http://localhost:5000/api/coffee/" + bagId, {
          headers: {
              Authorization: `Bearer ${token ?? ""}`,
          }}).then(r => r.json())])
          })
          .then(combinedData => {
            console.log(combinedData);
            const data = combinedData[0];
            const bagData = combinedData[1].coffee;

            const bagDataFormatted: CoffeeBag = {id: bagData.id,
              name: bagData.name,
              weightTotal: bagData.weight,
              summaryNotes: "no notes"
            }

            const bagSessions: BrewSession[] = data.map((i: any) => ({
                id: i.id || "id",
                bagId: i.coffee_id,
                rating: i.score || 0,
                date: i.created_at,
                brewMethod: "Pour-over",
                brewTime: 215,
                weightUsed: 200,
                temperatureF: 180,
                flavorProfile: {
                  acidity: i.acidity || 2,
                  clarity: i.clarity || 2,
                  bitterness: i.bitterness || 2,
                  sweetness: i.sweetness || 2,
                  body: i.body || 2,
                },
                notes: [i.notes || "No notes"]
            }));

            // CALCULATE ALL FIELDS FOR THE BAG SUMMARY
            const calculatedBag = calculateBagData(bagDataFormatted, bagSessions);
            setBag(calculatedBag);

            // FIND HIGHEST RATING BREW FOR THIS BAG
            const highestRatedBrew = bagSessions.reduce(
              (best, current) => (current.rating > best.rating ? current : best),
              bagSessions[0] || ({ rating: 0 } as BrewSession)
            );
            setBestBrew(highestRatedBrew.rating > 0 ? highestRatedBrew : null);

          });

        } catch (err: any) {
          console.error("Error fetching recipes:", err);
        } finally {
          setLoading(false);
        }
        }
      
        fetchBrews();
  }, [bagId]);

  return { bag, bestBrew, loading };
};

// HELPER FUNCTIONS

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fillPercentage = (rating / 5) * 100;

  return (
    <div className="relative inline-block w-fit h-fit">

      {/* EMPTY/BACKGROUND STARS */}
      <div className="flex whitespace-nowrap text-cbg3">
        <span className="text-3xl">★★★★★</span> 
      </div>

      {/* FILLED (YELLOW) STARS */}
      <div 
        className="absolute top-0 left-0 flex overflow-hidden whitespace-nowrap text-caccent1"
        style={{ width: `${fillPercentage}%` }} 
      >
        {/* RENDER STARS */}
        <span className="text-3xl">★★★★★</span> 
      </div>

    </div>
  );
};


const FlavorProfileChart: React.FC<{ profile: CalculatedBagData['averageFlavorProfile'] }> = ({ profile }) => {
    const data = [
        { subject: 'Acidity', A: profile.acidity, fullMark: 5 },
        { subject: 'Clarity', A: profile.clarity, fullMark: 5 },
        { subject: 'Bitterness', A: profile.bitterness, fullMark: 5 },
        { subject: 'Sweetness', A: profile.sweetness, fullMark: 5 },
        { subject: 'Body', A: profile.body, fullMark: 5 },
    ];

    return (
        <div className="w-full mx-auto" style={{ height: '280px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="80%" 
                    data={data}
                >
                    {/* Draws the web lines. */}
                    <PolarGrid stroke="#4B5563" /> 
                    
                    {/* Displays the labels. */}
                    <PolarAngleAxis 
                        dataKey="subject" 
                        stroke="#D1D5DB" 
                        tick={{ fill: '#D1D5DB', fontSize: 12 }} 
                    />
                    
                    {/* Sets the range and displays the radius lines (0, 1, 2, 3, 4, 5). */}
                    <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 5]} 
                        tickCount={6} 
                        stroke="#4B5563" 
                        tick={{ fill: '#9CA3AF', fontSize: 10 }}
                    />
                    
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#374151', 
                            borderColor: '#1F2937', 
                            color: 'white' 
                        }} 
                    />
                    
                    {/* Defines the actual colored shape */}
                    <Radar 
                        name="Flavor Profile" 
                        dataKey="A" 
                        stroke="#60A5FA" // Border
                        fill="#60A5FA"   // Fill
                        fillOpacity={0.6} 
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

const CoffeeLoader: React.FC = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cbg1 text-white p-8">
        <div className="relative w-16 h-16 mb-4">
            <Coffee 
                size={64} 
                className="text-white absolute bottom-0" 
            />
        </div>
        <div className="text-2xl font-light">Brewing up the data...</div>
    </div>
);

const Card: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`p-4 bg-cbg2 rounded-lg shadow-xl ${className}`}>
    {children}
  </div>
);

// MAIN PAGE COMPONENT

export const BagSummary: React.FC = () => {
  const { bagId: bagIdString } = useParams<BagParams>();
  const navigate = useNavigate();

  const bagId = parseInt(bagIdString || '0', 10);

  const { bag, bestBrew, loading } = useCoffeeBagData(bagId);

  // BACK TO ALL SUMMARY BAGS SUMMARY PAGE? SET -1 FOR NOW
  const handleCancel = () => {
    navigate(-1); 
  };

  const handleErrorBack = () => {
    navigate('/viewcoffees'); 
  };
  
  // WHERE BAGS ARE STORED?
  const handleEdit = () => {
      navigate(`/bags/${bagId}/edit`); 
  };

  // LOADING
  if (loading) {
    // return <div className="min-h-screen bg-cbg1 text-white text-center p-8 text-2xl">Brewing up the data...</div>;
    return <CoffeeLoader />;
  }

  // NO FOUND BAG ERROR HANDLE
  if (!bag) {
    return (
      <div className="min-h-screen bg-cbg1 p-8 text-center text-white">
        <h2 className="text-3xl font-bold text-cerror">Bag Not Found</h2>
        <p className="mt-2 text-lg">Could not find a coffee bag with ID: <span className='font-bold'>{bagId}</span></p>
        <button onClick={handleErrorBack} className="mt-6 p-2 bg-cbg3 rounded hover:bg-gray-600">Go Back</button>
      </div>
    );
  }

  // RENDER PAGE CONTENT
  return (
    <div className="p-4 sm:p-8 text-white overflow-x-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 mb-6 bg-cbg2 rounded-lg">
        <button onClick={handleCancel} className="text-lg text-ctext hover:text-white">Cancel</button>
        <h1 className="text-2xl font-bold">Bag Summary</h1>
        <button onClick={handleEdit} className="text-lg font-semibold text-caction hover:text-cactionHover">Edit</button>
      </div>
      
      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --------------------- COLUMN 1: Bag Overview & Flavor --------------------- */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h2 className="text-4xl font-extrabold mb-2 text-center">{bag.name}</h2>
            <div className="flex items-center mb-2 justify-center gap-2">
              <span className="text-4xl font-light mr-2">{bag.averageRating.toFixed(1)}</span>
              <StarRating rating={bag.averageRating} />
            </div>
            <p className="text-ctext text-center mb-6">Average Rating</p>

            <table className="w-full text-sm text-left table-auto">
              <tbody>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Bags Logged</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.bagsLogged}</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Last Used</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.lastUsedDaysAgo} days ago</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Beans Remaining</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.weightRemaining}g</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Average Brew Time</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.averageBrewTime}s</td>
                </tr>
                <tr>
                  <td className={TABLE_CELL_LEFT}>Most Used Method</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.mostUsedMethod}</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="text-xl font-bold mb-4 text-center text-caccent2">Average Flavor Profile</h3>
            <div className='bg-cbg3 p-4 rounded'>
                <FlavorProfileChart profile={bag.averageFlavorProfile} />
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-bold mb-4 text-center text-caccent3">Top Notes</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {bag.totalNotes.map((note, index) => (
                <div key={index} className="p-2 text-center bg-cbg3 rounded-md font-medium text-sm">
                  {note}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* --------------------- COLUMN 2: Best Brew & Full Bag Information --------------------- */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-t-4 border-caccent1">
            <div className="text-center mb-4">
              <p className="text-lg font-light text-caccent1">Best Brew</p>
              <h2 className="text-4xl font-extrabold">{bestBrew?.brewMethod || 'N/A'}</h2>
              <div className="flex justify-center mt-2">
                <StarRating rating={bestBrew?.rating || 0} />
              </div>
            </div>

            {bestBrew && (
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <p className="col-span-2 text-center text-ctext">Brewed on: {bestBrew.date}</p>
                <div className="text-center">
                  <p className="font-bold text-lg">{bestBrew.brewMethod}</p>
                  <p className="text-ctext">Method</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{bestBrew.brewTime}s</p>
                  <p className="text-ctext">Brew Time</p>
                </div>
              </div>
            )}

            {bestBrew && (
              <>
                <h3 className="text-lg font-bold border-b border-cbg3 pb-2 mb-2">Brew Information</h3>
                <table className="w-full text-sm text-left table-auto">
                  <tbody>
                    <tr>
                      <td className={TABLE_CELL_LEFT}>Rating</td>
                      <td className={TABLE_CELL_RIGHT}>{bestBrew.rating} / 10</td>
                    </tr>
                    <tr>
                      <td className={TABLE_CELL_LEFT}>Last Used Date</td>
                      <td className={TABLE_CELL_RIGHT}>{bestBrew.date || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className={TABLE_CELL_LEFT}>Beans Used</td>
                      <td className={TABLE_CELL_RIGHT}>{bestBrew.weightUsed}g</td>
                    </tr>
                  </tbody>
                </table>

                {/* UNFINISHED CODE FOR FLAVOR PROFILE CHART AND TOP NOTES. NEED TO FIGURE OUT IF WANT OR HOW TO DISPLAY THIS IN A NICE WAY

                <div className="grid grid-cols-3 gap-4 mt-6 bg-cbg3 p-4 rounded">

                  <div className="col-span-2">
                    <h3 className="text-lg font-bold mb-2 text-center text-caccent2">Flavor Profile</h3>

                    <div
                      className='p-2 relative overflow-hidden w-full'
                      style={{ paddingTop: '80%' }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          transform: 'scale(0.75)',
                          transformOrigin: 'top-center',
                          width: '100%',
                          height: '100%',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      >
                        <FlavorProfileChart profile={bag.flavorProfile} />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 flex flex-col items-center">
                    <h3 className="text-lg font-bold mb-2 text-center text-caccent3">Top Notes</h3>

                    <div className="flex flex-col gap-2 w-full justify-center">
                      {bag.topNotes.map((note, index) => (
                        <div key={index}
                          className="p-1 text-center bg-cnote rounded-md font-medium text-xs mx-auto w-full break-words whitespace-normal">
                          {note}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                */}
              </>
            )}
          </Card>
        </div>


        {/* --------------------- COLUMN 3: Key Brew Stats & Notes --------------------- */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <h3 className="text-xl font-bold mb-4 text-center text-caccent4">Bag Information</h3>
            <table className="w-full text-sm text-left table-auto">
              <tbody>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Average Rating</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.averageRating}</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Total Brews Logged </td>
                  <td className={TABLE_CELL_RIGHT}>{bag.bagsLogged}</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>First Used</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.firstUsedDate || 'N/A'}</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Last Used</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.lastUsedDate || 'N/A'}</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Bag Weight</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.weightTotal}g</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Average Beans Used</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.weightUsedAverage}g</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Beans Used</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.weightUsedTotal}g</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Beans Remaining</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.weightRemaining}g</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Most Used Method</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.mostUsedMethod}</td>
                </tr>
                <tr className={TABLE_ROW_BORDER}>
                  <td className={TABLE_CELL_LEFT}>Average Brew Time</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.averageBrewTime}s</td>
                </tr>
                <tr>
                  <td className={TABLE_CELL_LEFT}>Average Temperature</td>
                  <td className={TABLE_CELL_RIGHT}>{bag.averageTemperatureF}°F</td>
                </tr>
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="text-xl font-bold mb-4 text-center text-yellow-300">Notes</h3>
            <div className="p-4 h-64 bg-cbg3 rounded-md overflow-y-auto">
              <p className="whitespace-pre-wrap text-ltext">
                {bag.summaryNotes}
              </p>
            </div>
            <p className="text-xs text-right mt-2 text-cnote">Notes are saved directly to this bag summary page.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};