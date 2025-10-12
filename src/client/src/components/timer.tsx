import { useStopwatch } from 'react-timer-hook'
import { Button } from './ui/button'
import { Check, Pause, Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './header'


const recipe = [
  {
    endTime: 5,
    type: "Bloom",
    description: "Pour 40mL to evenly wet coffee bed",
    targetWeight: 40
  },
  {
    endTime: 10,
    type: "Wait",
    description: "Let coffee bloom for 30sec",
    targetWeight: 40
  },
  {
    endTime: 20,
    type: "Pour",
    description: "Pour 40mL to evenly wet coffee bed",
    targetWeight: 40
  },
  {
    endTime: 25,
    type: "Complete",
    description: "Enjoy your hard work!",
    targetWeight: 40
  }
]

const Timer = () => {
  const [isComplete, setIsComplete] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  const step = recipe[stepIndex]

  const {
    totalSeconds,
    seconds,
    minutes,
    start,
    pause,
    // isRunning,
  } = useStopwatch({ autoStart: false })

  const handleStart = () => {
    start()
    setIsRunning(true)
  }

  const handlePause = () => {
    pause()
    setIsRunning(false)
  }

  useEffect(() => {
    if (step.type === "Complete") {
      pause()
      setIsComplete(true)
    }
    else if (totalSeconds >= step.endTime) {
      setStepIndex(prev => prev + 1)
    }
  }, [totalSeconds, isComplete])

  type StepType = 'Pour' | 'Wait' | 'Bloom' | 'Complete'

  const color = {
    Pour: 'bg-sky-200',
    Wait: 'bg-gray-200',
    Bloom: 'bg-fuchsia-200',
    Complete: 'bg-lime-200'
  }

  const bgColor = color[step.type as StepType]

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-between  gap-4'>
      <Header />
      <div className='w-2/3 h-full bg-gray-200 shadow-md border-gray-200 rounded-2xl'>
        <div className='flex justify-center p-2 text-6xl font-mono'>
          <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>
        <div className={`h-36 w-3/4 ${bgColor} flex flex-col items-center justify-evenly p-2 shadow-lg rounded-2xl animate-in`}>
          <h1 className='text-2xl text-gray-700 font-bold'>{step.type}</h1>
          <p className='text-gray-600'>{step.description}</p>
        </div>
      <div className='flex gap-4 items-center pb-6'>
        {isComplete ? (
          <>
            <Button variant="secondary" className='rounded-full size-12 bg-gray-200 border-gray-300 hover:bg-gray-200' onClick={start}>
              <X className="size-8 stroke-gray-400" />
            </Button>
            <Link to="/">
              <Button variant="secondary" className='rounded-full size-12 bg-gray-200 border-gray-300 hover:bg-gray-200' onClick={start}>
                <Check className="size-8 stroke-gray-400" />
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button variant="secondary" className='rounded-full size-20 bg-gray-200 border-gray-300 hover:bg-gray-300' onClick={handlePause}>
              <Pause className="size-12 stroke-gray-400" />
            </Button>
            <Button variant="secondary" className={`rounded-full size-20 ${isRunning ? 'bg-gray-200' : 'bg-lime-200'} border-lime-300 hover:bg-lime-200`} onClick={handleStart}>
              <Play className="size-12 stroke-lime-400" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Timer