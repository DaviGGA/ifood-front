import { CarouselDot } from "@/components/CarouselDot";
import deliveryVector from "../../assets/delivery-vector.svg"
import { CreateAccount } from "./components/CreateAccount";
import { useEffect, useState } from "react";
import { SelectAccountType } from "./components/SelectAccountType";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { CreateRestaurant } from "./components/CreateRestaurant";
import { AccountCreateProvider } from "./providers/account-create-provider";

export default function Signup() {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  },[api])

  return (
    <AccountCreateProvider>
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="flex w-full max-w-6xl bg-white rounded-lg h-[540px] shadow-lg">
          <div className="w-1/2 flex flex-col justify-between p-8">
            <Carousel setApi={setApi} opts={{watchDrag: false}}>
              <CarouselContent>
                <CarouselItem>
                  <CreateAccount carouselApi={api}/>
                </CarouselItem>
                <CarouselItem>
                  <SelectAccountType carouselApi={api}/>
                </CarouselItem>
                <CarouselItem>
                  <CreateRestaurant carouselApi={api}/>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <div className="flex justify-center gap-4 mt-5">
              <CarouselDot active={current == 1}/>
              <CarouselDot active={current == 2}/>
              <CarouselDot active={current == 3}/>
            </div>
          </div>
          <div
            className="relative w-1/2 bg-cover"
            style={{ backgroundImage: "url('/placeholder.svg?height=600&width=600')" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary bg-opacity-25">
              <img className="h-5/6" src={deliveryVector}/>
            </div>
          </div>
        </div>
      </div>
    </AccountCreateProvider>

  )
}