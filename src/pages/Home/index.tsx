import { FoodCard } from "@/components/FoodCard";
import Navbar from "@/components/Navbar";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Home() {
  return (
    <div>
      <Navbar/>
      <div className="mt-10 w-3/4 mx-auto">
        <h3 className="font-bold text-lg">Recomendations</h3>
        <Carousel className="mt-5">
          <CarouselContent>
            {[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map( (value, idx) => {
              return (
                <CarouselItem className="basis-1/10">
                  {/* <FoodCard num={idx}/> */}
                </CarouselItem>
              )
            })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}

