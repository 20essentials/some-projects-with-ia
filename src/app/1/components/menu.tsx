'use client';

import { useActionState } from 'react';
import { actionSubmit } from '../actions';
import { formEntityType, inputID } from '../utils/consts';

const INITIAL_STATE: formEntityType = {
  question: '',
  response: ''
};

const styles = {
  overlay: `fixed inset-0 flex items-center justify-center bg-black/40`,
  form: `w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg`,
  header: `mb-6 space-y-1`,
  title: `text-lg font-semibold`,
  description: `text-sm text-muted-foreground`,
  fieldsWrapper: `space-y-4`,
  field: `space-y-2`,
  label: `text-sm font-medium`,
  input: `w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20`,
  textarea: `w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20`,
  footer: `mt-6 flex justify-end gap-2`,
  cancelButton: `rounded-md border px-4 py-2 text-sm hover:bg-muted`,
  submitButton: `rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50`
};

export function Menu() {
  const [currentState, formAction, isPending] = useActionState(
    actionSubmit,
    INITIAL_STATE
  );

  return (
    <div className={styles.overlay}>
      <form action={formAction} className={styles.form}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chat With Groq</h2>
          <p className={styles.description}>Make questions baby!</p>
        </div>
        <div className={styles.fieldsWrapper}>
          <div className={styles.field}>
            <label htmlFor={inputID.question} className={styles.label}>
              Question
            </label>
            <input
              id={inputID.question}
              name={inputID.question}
              defaultValue={currentState.question}
              placeholder="Do Fibonacci in JavaScript"
              className={styles.input}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={inputID.response} className={styles.label}>
              Response
            </label>
            <textarea
              id={inputID.response}
              name={inputID.response}
              defaultValue={currentState.response}
              placeholder="..."
              rows={4}
              className={styles.textarea}
            />
          </div>
        </div>
        <div className={styles.footer}>
          <button type="reset" className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" disabled={isPending} className={styles.submitButton}>
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
