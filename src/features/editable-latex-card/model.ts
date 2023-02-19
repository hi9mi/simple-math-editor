import { createEvent } from 'effector';
import { latexModel } from '@math-editor/entities/latex';

const editingLatexSaved = createEvent<{
  id: string;
  latex: string;
  description: string;
}>();

latexModel.$latexExpressionsList.on(
  editingLatexSaved,
  (latexList, editedLatex) =>
    latexList.map((latex) =>
      latex.id === editedLatex.id ? editedLatex : latex
    )
);

export const events = { editingLatexSaved };
