import { lazy, Suspense } from 'react';
import { useList, useUnit } from 'effector-react';
import { MathJaxContext } from 'better-react-mathjax';
import { latexModel } from '@math-editor/entities/latex';
import { Header } from '@math-editor/shared/ui';
const CreateLaTexForm = lazy(
  () => import('@math-editor/features/create-latex-form')
);
const EditableLaTexCard = lazy(
  () => import('@math-editor/features/editable-latex-card')
);

import './index.css';

export const App = () => {
  const isLatexListEmpty = useUnit(latexModel.$latexExpressionsListEmpty);
  const latexList = useList(
    latexModel.$latexExpressionsList,
    ({ id, latex, description }) => {
      return (
        <EditableLaTexCard latex={latex} id={id} description={description} />
      );
    }
  );

  return (
    <div className="min-h-[100vh] w-full bg-stone-100">
      <Header />
      <MathJaxContext>
        <main className="m-auto w-full max-w-5xl px-3">
          <Suspense fallback={<p>Loading...</p>}>
            <CreateLaTexForm />
          </Suspense>
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="text-xl font-semibold">
              Mathematical expressions list
            </h2>
            {isLatexListEmpty ? (
              <p>Empty list...</p>
            ) : (
              <Suspense fallback={<p>Loading...</p>}>{latexList}</Suspense>
            )}
          </div>
        </main>
      </MathJaxContext>
    </div>
  );
};
