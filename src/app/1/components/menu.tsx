'use client';

import { useActionState } from 'react';
import { actionSubmit } from '../actions';
import { formEntityType, inputID } from '../utils/consts';

const INITIAL_STATE: formEntityType = {
  question: '',
  response: ''
};

export function Menu() {
  const [currentState, formAction, isPending] = useActionState(
    actionSubmit,
    INITIAL_STATE
  );

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/40'>
      <form
        action={formAction}
        className='w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg'
      >
        <div className='mb-6 space-y-1'>
          <h2 className='text-lg font-semibold'>Chat With Groq</h2>
          <p className='text-sm text-muted-foreground'>Make questions baby!</p>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <label htmlFor={inputID.question} className='text-sm font-medium'>
              Question
            </label>
            <input
              id={inputID.question}
              name={inputID.question}
              defaultValue={currentState.question}
              placeholder='Do Fibonacci in JavaScript'
              className='w-full rounded-md border px-3 py-2 text-sm outline-none
                         focus:border-primary focus:ring-2 focus:ring-primary/20'
            />
          </div>

          <div className='space-y-2'>
            <label htmlFor={inputID.response} className='text-sm font-medium'>
              Response
            </label>
            <textarea
              id={inputID.response}
              name={inputID.response}
              defaultValue={currentState.response}
              placeholder='...'
              rows={4}
              className='w-full resize-none rounded-md border px-3 py-2 text-sm outline-none
                         focus:border-primary focus:ring-2 focus:ring-primary/20'
            />
          </div>
        </div>

        <div className='mt-6 flex justify-end gap-2'>
          <button
            type='reset'
            className='rounded-md border px-4 py-2 text-sm hover:bg-muted'
          >
            Cancel
          </button>

          <button
            type='submit'
            disabled={isPending}
            className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground
                       hover:bg-primary/90 disabled:opacity-50'
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
