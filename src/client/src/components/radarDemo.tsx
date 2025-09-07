import { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Treemap } from 'recharts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select';

const data = [
  {
    subject: 'Acidity',
    score: 5,
  },
  {
    subject: 'Body',
    score: 0,
  },
  {
    subject: 'Sweetness',
    score: 0,
  },
  {
    subject: 'Bitterness',
    score: 0,
  },
  {
    subject: 'Clarity',
    score: 0,
  },
];

const treeMapData = [
  {
    name: 'data',
    children: [
      { name: 'SL-28', size: 74 },
      { name: 'SL-32', size: 32 },
      { name: 'Gesha', size: 12 },
      { name: 'Catuai', size: 54 },
      { name: 'Catimor', size: 20 },
      { name: 'Maragogype', size: 10 },
      { name: 'Typica', size: 43 },
      { name: 'Pache', size: 15 },
    ],
  },
];

const RadarDemo = () => {
  const [rating, setRating] = useState(data)
  const qualities = ['Acidity', 'Sweetness', 'Body', 'Bitterness', 'Clarity']

  
  const handleRatingChange = (score: string, quality: string) => {
    setRating(prevRatings => 
      prevRatings.map(item =>
        item.subject === quality
        ? {...item, score: Number(score)}
        : item
      )
    )
  }

  return (
    <div className='min-h-screen w-full'>
      <div className='h-100 w-full grid grid-rows-2 justify-center items-center'>
        <div className='flex flex-wrap gap-2 items-center'>
          {qualities.map(quality => {
            return (
              <Select onValueChange={value => handleRatingChange(value, quality)}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder={quality} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>{quality}</SelectLabel>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )
          })}
        </div>
        <ResponsiveContainer width="90%" height="100%">
          <RadarChart outerRadius="75%" data={rating} >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" domain={[0,5]} tick={{fill: '#171717'}} />
            <PolarRadiusAxis domain={[0,6]} />
            <Radar name="Coffee" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className='flex flex-col justify-center items-center gap-4 h-200'>
          <ResponsiveContainer width="90%" height="100%">
            <Treemap data={treeMapData} dataKey="size" aspectRatio={4 / 2} stroke="#fff" fill="#8884d8" />
          </ResponsiveContainer>
      </div>
  
    </div>
  )
}

export default RadarDemo