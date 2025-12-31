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
import { inputID } from '../utils/consts';

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
              <Label htmlFor={inputID.question}>Question</Label>
              <Input
                id={inputID.question}
                name={inputID.question}
                defaultValue=''
                placeholder='Do Fibonacci in JavaScript'
              />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor={inputID.response}>Response</Label>
              <Textarea
                id={inputID.response}
                name={inputID.response}
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
