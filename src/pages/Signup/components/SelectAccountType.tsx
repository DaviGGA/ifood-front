import { Button } from '@/components/ui/button';
import { CarouselApi } from '@/components/ui/carousel';
import { ChefHat } from 'lucide-react';
import { User } from 'lucide-react';
import { MouseEventHandler } from 'react';
import { useAccountCreate } from '../providers/account-create-provider';

type Props = {
  carouselApi: CarouselApi
}

export function SelectAccountType(props: Props) {

  const accountCreate = useAccountCreate();

  function goBack() {
    props.carouselApi?.scrollPrev();
  }

  function selectRestaurant() {
    accountCreate.setAccountType("RESTAURANT")
    props.carouselApi?.scrollNext();
  }

  function selectUser() {

  }

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-center">What are you?</h2>
        <div className='flex mt-[96px] justify-evenly'>
          <TypeIcon onClick={selectRestaurant} name='Restaurant'  icon='RESTAURANT'/>
          <TypeIcon onClick={selectUser} name='User' icon='USER'/>       
        </div>
        <div className='flex justify-center mt-10'>
          <Button onClick={goBack} className="w-3/4 bg-primary">Go back</Button>
        </div>
    </div>
  )
}

type IconType = "RESTAURANT" | "USER"

type IconProps = {
  name: string,
  icon: IconType,
  onClick: MouseEventHandler<HTMLDivElement>
}

function TypeIcon(props: IconProps) {
  const borderClass = "w-[120px] h-[120px] rounded-full relative hover:bg-slate-100";
  const iconClass = "w-[72px] h-[72px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

  function getIconElement() {
    if (props.icon == "RESTAURANT") return <ChefHat className={iconClass}/>
    return <User className={iconClass}/>
  }
  
  return (
    <div onClick={props.onClick} className='flex flex-col justify-center cursor-pointer'>
      <div className={borderClass}>
        {getIconElement()}
      </div>
      <span className='text-center font-bold'>{props.name}</span>
   </div>
  )
}