import { useStopwatch } from 'react-timer-hook'
import { Button } from './ui/button'
import { Check, Pause, Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Timer = () => {
  const [isComplete, setIsComplete] = useState(false)

  const {
    totalSeconds,
    seconds,
    minutes,
    start,
    pause,
    isRunning,
  } = useStopwatch({ autoStart: false })

  useEffect(() => {
    if (totalSeconds >= 10) {
      pause()
      setIsComplete(true)
    }
  }, [totalSeconds, isComplete])

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-between py-8 gap-4'>
      <div className='w-2/3 h-full bg-gray-200 shadow-md border-gray-200 rounded-2xl'>
        <div className='flex justify-center p-2 text-6xl font-mono'>
          <span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
        </div>
      </div>
      {isComplete ? (
        <div className='h-36 w-3/4 bg-lime-200 flex flex-col items-center justify-evenly p-2 shadow-lg rounded-2xl animate-in'>
          <h1 className='text-2xl text-lime-700 font-bold'>Brew Completed</h1>
          <p className='text-gray-600'>Enjoy your hard work!</p>
        </div>
      ) : (
        <div className='h-36 w-3/4 bg-sky-200 flex flex-col items-center justify-evenly p-2 shadow-lg rounded-2xl'>
          <h1 className='text-2xl text-sky-700 font-bold'>Pour</h1>
          <p className='text-gray-600'>Pour 50mL until 2:30</p>
        </div>
      )}

      <div className='flex gap-4 items-center'>
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
            <Button variant="secondary" className='rounded-full size-20 bg-gray-200 border-gray-300 hover:bg-gray-200' onClick={pause}>
              <Pause className="size-12 stroke-gray-400" />
            </Button>
            <Button variant="secondary" className='rounded-full size-20 bg-lime-200 border-lime-300 hover:bg-lime-200' onClick={start}>
              <Play className="size-12 stroke-lime-400" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Timer