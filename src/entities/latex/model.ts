import { createStore } from 'effector';
import { persist } from 'effector-storage/local';
import type { LaTexExpression } from '@math-editor/shared/types';

export const $latexExpressionsList = createStore<LaTexExpression[]>([]);

export const $latexExpressionsListEmpty = $latexExpressionsList.map(
  (list) => list.length === 0
);

persist({ store: $latexExpressionsList, key: 'latex-list' });
