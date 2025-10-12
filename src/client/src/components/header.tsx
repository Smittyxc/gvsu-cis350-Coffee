import { Coffee } from "lucide-react"

const Header = () => {

  return (
    <div className="sticky flex justify-center items-center shadow-md gap-6 py-2 top-0 w-full bg-blue-600">
      <Coffee size={36} color="#ffffff" />
      <h1 className="text-3xl text-white font-semibold">Best<span className="font-light">Brew</span></h1>
    </div>
  )
}

export default Header