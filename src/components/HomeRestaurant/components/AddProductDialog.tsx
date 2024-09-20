import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z, ZodError } from "zod"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createFood } from "@/api/create-food"
import { useToast } from "@/components/ui/use-toast"



const formSchema = z.object({
  name: z.string(),
  image: z.any(),
  price: z.string(),
  category: z.string()
})

type Props = {
  addedEvent: Function
}

export function AddProductDialog(props: Props) {

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  async function onSaveClick(values: z.infer<typeof formSchema>) {

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("price", String(values.price));
    formData.append("image", imageFile as Blob);
    formData.append("category", values.category);
    formData.append("accountId", "4e61bdad-4b8a-4ae8-ba3f-1cf9118b51df");


    setIsFetching(true)
    createFood(formData).
    then(_ => {
      toast({
        title: "Food added",
        description: `Food ${values.name} successfully added into your menu!`,
      })
      setModalOpen(false);
      setIsFetching(false);
      props.addedEvent()
    }).
    catch(_ => setIsFetching(false)) 
  
  }

  function onChangeImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setImagePreview(reader.result as string);
    setImageFile(file);
  }


  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>Add food</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add your new food into the menu</DialogTitle>
          <DialogDescription>
            Expand your menu by adding a delicious new dish. Provide details like name, image and price.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">                   
          <Avatar className="w-[160px] h-[160px] cursor-pointer" onClick={() => imageInputRef.current?.click()}>
              <AvatarImage src={imagePreview}/>
              <AvatarFallback>FD</AvatarFallback>
          </Avatar>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSaveClick)} className="w-full flex flex-col gap-3">
              <input name="image" type="file" ref={imageInputRef} className="w-0 h-0" onChange={onChangeImage}/>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                    <Input {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" step={0.1} className="" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the category of your food"/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dessert">Dessert</SelectItem>
                        <SelectItem value="beverage">Beverage</SelectItem>
                        <SelectItem value="pasta">Pasta</SelectItem>
                        <SelectItem value="lunch">Lunch</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button loading={isFetching} className="w-1/4 self-end" type="submit">Save</Button>
            </form>
          </Form>

        </div>
      </DialogContent>
    </Dialog>
  )
}


