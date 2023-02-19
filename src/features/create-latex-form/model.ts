import { createEvent, createStore, sample } from 'effector';
import { persist } from 'effector-storage/local';
import { nanoid } from 'nanoid';
import { latexModel } from '@math-editor/entities/latex';

export const $latex = createStore('');
export const $description = createStore('');
const latexChanged = createEvent<string>();
const descriptionChanged = createEvent<string>();
const latexFormSubmitted = createEvent();

sample({
  clock: latexChanged,
  target: $latex,
});

sample({
  clock: descriptionChanged,
  target: $description,
});

const latexExpressionCreated = sample({
  clock: latexFormSubmitted,
  source: [$latex, $description] as const,
  filter: ([latex]) => latex.length > 0,
  fn: ([latex, description]) => ({ id: nanoid(), latex, description }),
});

sample({
  //@ts-expect-error internal
  clock: latexFormSubmitted,
  target: [$latex.reinit, $description.reinit],
});

latexModel.$latexExpressionsList.on(
  latexExpressionCreated,
  (latexList, newLatex) => [...latexList, newLatex]
);

persist({ store: $latex, key: 'latex-form-value' });
persist({ store: $description, key: 'description-form-value' });

export const events = { latexChanged, latexFormSubmitted, descriptionChanged };
