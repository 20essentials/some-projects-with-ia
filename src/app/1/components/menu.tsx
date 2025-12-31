'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Menu() {
  return (
    <Dialog open>
      <form>
        <DialogContent className='max-w-106.25'>
          <DialogHeader>
            <DialogTitle>Chat With Groq</DialogTitle>
            <DialogDescription>Make Questinons Baby!</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4'>
            <div className='grid gap-3'>
              <Label htmlFor='name-1'>Question</Label>
              <Input
                id='name-1'
                defaultValue=''
                placeholder='Do Fibonacci in JavaScript'
              />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='username-1'>Response</Label>
              {/* <Input className='field-sizing-content' id='username-1' defaultValue='' placeholder='...' /> */}
              <Textarea
                id='username-1'
                className='field-sizing-content resize-none'
                defaultValue=''
                placeholder='...'
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Send</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
