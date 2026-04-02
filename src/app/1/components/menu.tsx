'use client';

import { useState } from 'react';
import { API_URL, formEntityType, inputID, MODEL_NAME } from '../utils/consts';
import { Streamdown } from 'streamdown';
import { code } from '@streamdown/code';
import { mermaid } from '@streamdown/mermaid';
import { math } from '@streamdown/math';
import { cjk } from '@streamdown/cjk';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';

const INITIAL_STATE: formEntityType = {
  question: '',
  response: ''
};

const styles = {
  overlay: `fixed inset-0 flex items-center justify-center bg-black/10 select-none`,
  form: `w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg select-none`,
  header: `mb-6 space-y-1 select-none`,
  title: `text-lg font-semibold select-none`,
  description: `text-sm text-muted-foreground select-none`,
  fieldsWrapper: `space-y-4 select-none`,
  field: `space-y-2 select-none`,
  label: `text-sm font-medium select-none`,
  input: `w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 select-text`,
  responseWrapper: `w-full rounded-md border px-3 py-2 text-sm bg-background max-h-60 overflow-y-auto relative select-text`,
  footer: `mt-6 flex justify-end gap-2 select-none`,
  cancelButton: `rounded-md border px-4 py-2 text-sm hover:bg-muted select-none`,
  submitButton: `rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 select-none`
};

export function Menu() {
  const [question, setQuestion] = useState(INITIAL_STATE.question);
  const [response, setResponse] = useState(INITIAL_STATE.response);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse('');
    setIsPending(true);

    try {
      const res = await fetch(API_URL, {
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
          setResponse(prev => prev + chunk);
        }
      }
    } catch (err) {
      console.error(err);
      setResponse(prev => prev + '\n\n⚠️ Error streaming response');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.header}>
          <h2 className={styles.title}>Chat With Grok - Model {MODEL_NAME}</h2>
          <p className={styles.description}>
            Ask anything and get streaming answers!
          </p>
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
              spellCheck="false"
              onChange={e => setQuestion(e.target.value)}
              placeholder='Type your question here...'
              className={styles.input}
              disabled={isPending}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={inputID.response} className={styles.label}>
              Response
            </label>
          </div>

          <div className={styles.responseWrapper}>
            <Streamdown
              plugins={{ code, mermaid, math, cjk }}
              isAnimating={isPending}
              className='prose prose-sm text-sm overflow-x-auto'
            >
              {response || 'Streaming response will appear here...'}
            </Streamdown>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type='reset'
            className={styles.cancelButton}
            onClick={() => {
              setQuestion('');
              setResponse('');
            }}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}
