import { formatToMoney } from "@/utils/formatToMoney"
import pizzaImg from "../../assets/pizza-ex.png"


type Props = {
  name: string,
  price: number
}

export function FoodCard(props: Props) {
  return (
    <div className="flex flex-col cursor-pointer hover:scale-90 transition duration-300">
      <img src={pizzaImg} className="w-[160px] h-[160px] rounded-lg"/>
      <span className="mt-3 font-semibold">{props.name}</span>
      <span className="opacity-40">Restaurant</span>
      <span className="text-green-600">{formatToMoney(props.price)}</span>
    </div>
  )
}