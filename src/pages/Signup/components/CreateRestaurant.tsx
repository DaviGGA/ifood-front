import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CarouselApi } from "@/components/ui/carousel";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { z } from "zod";
import react from '../../../assets/react.svg'
import { ChangeEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRestaurant, createRestaurantBody } from "@/api/create-restaurant";
import { useAccountCreate } from "../providers/account-create-provider";
import { resolve } from "path";

type Props = {
  carouselApi: CarouselApi
}

const formSchema = z.object({
  name: z.string(),
  image: z.any()
})


export function CreateRestaurant(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();

  const accountId = useAccountCreate().accountId;

  async function onSignUpClick(values: z.infer<typeof formSchema>) {

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("image", imageFile as Blob);
    formData.append("accountId", accountId)
    
    const response = await createRestaurant(formData); 
    
    if (response.status > 200 && response.status < 300) return;
    
  }
  
  function onChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result as string);
    setImageFile(file);
  }


  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-center">SIGN UP</h2>
      <p className="mb-8 text-sm text-center text-gray-600">Hungry? We deliver.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSignUpClick)}>
          <input name="image" type="file" ref={imageInputRef} className="w-0 h-0" onChange={onChangeImage}/>
          <div className="w-full flex justify-center">
            <Avatar className="w-[160px] h-[160px] cursor-pointer" onClick={() => imageInputRef.current?.click()}>
              <AvatarImage src={imagePreview ?? react} />
              <AvatarFallback>RES</AvatarFallback>
            </Avatar>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your restaurant name" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary mt-5">Create</Button>
        </form>
      </Form>
    </div>

  )
}