import React, {useState} from 'react'
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
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'
import CommonForm from '../common/form'
import { uploadVideoControls } from '@/conf/config'
import { uploadVideo } from '@/store/user-slice/videoSlice'
import { useDispatch } from 'react-redux'
import { useToast } from '@/hooks/use-toast'

function AddVideoDialog() {
    const initialState = {
        title: "",
        description: "",
        category:""
      }



      const dispatch = useDispatch()
     const [formData, setFormData] = useState(initialState)

     const {toast} = useToast()

     function onSubmit(event){
         event.preventDefault();
         console.log(formData)
     
         dispatch(uploadVideo(formData)).then((data) => {
           if (data?.payload?.success) {
             toast({
               title: data?.payload?.message,
             });
           } else {
             toast({
               title: data?.payload?.message,
               variant: "destructive",
             });
           }
         });
       }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <button className="bg-gray-100 flex items-center text-gray-600 justify-center py-2 px-2 rounded-full transition hover:bg-gray-300">
          <Plus size={23} strokeWidth={1.5} className="size-6 text-gray-600 mr-2" />
          Create
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a video</DialogTitle>
          <DialogDescription>
            Fill the details below and upload video file
          </DialogDescription>
        </DialogHeader>
      <CommonForm
        formControls={uploadVideoControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      </DialogContent>
    </Dialog>
  )
}

export default AddVideoDialog
