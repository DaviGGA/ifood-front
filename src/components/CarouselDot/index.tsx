type Props = {
  active?: boolean
}

export function CarouselDot(props: Props) {
  return (
    <div className={`w-[10px] h-[10px] ${props.active ? "bg-primary" : "bg-slate-400"}  rounded-full`}>
    </div>
  )
}