'use client';

import { useState, useRef } from 'react';
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
  const [question, setQuestion] = useState(INITIAL_STATE.question);
  const [response, setResponse] = useState(INITIAL_STATE.response);
  const [isPending, setIsPending] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse('');
    setIsPending(true);

    try {
      const res = await fetch('/1/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: question }] })
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        if (chunk) {
          setResponse((prev) => prev + chunk);

          if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
          }
        }
      }
    } catch (err) {
      console.error(err);
      setResponse((prev) => prev + '\n[Error streaming response]');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chat With Groq</h2>
          <p className={styles.description}>Ask anything and get streaming answers!</p>
        </div>

        <div className={styles.fieldsWrapper}>
          <div className={styles.field}>
            <label htmlFor={inputID.question} className={styles.label}>
              Question
            </label>
            <input
              id={inputID.question}
              name={inputID.question}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              className={styles.input}
              disabled={isPending}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={inputID.response} className={styles.label}>
              Response
            </label>
            <textarea
              ref={textareaRef}
              id={inputID.response}
              name={inputID.response}
              value={response}
              readOnly
              placeholder="Streaming response will appear here..."
              rows={8}
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="reset"
            className={styles.cancelButton}
            onClick={() => {
              setQuestion('');
              setResponse('');
            }}
            disabled={isPending}
          >
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
