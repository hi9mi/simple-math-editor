import { useUnit } from 'effector-react';
import { reflect } from '@effector/reflect';
import { Card, MathField, MathPreview } from '@math-editor/shared/ui';
import { $description, $latex, events } from './model';

export const CreateLaTexForm = () => {
  const submitLatexForm = useUnit(events.latexFormSubmitted);

  const handleSubmitLatexForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitLatexForm();
  };

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold">
        Create mathematical expression
      </h2>
      <form onSubmit={handleSubmitLatexForm} className="flex flex-col gap-5">
        <DescriptionFormField />
        <MathFormField />
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Preview</h3>
          <Card className="flex flex-col gap-8 overflow-x-auto empty:hidden">
            <DescriptionPreview />
            <LaTexPreview />
          </Card>
        </div>
        <button type="submit" className="btn">
          Create
        </button>
      </form>
    </>
  );
};

const MathFormField = reflect({
  view: MathField,
  bind: {
    onChange: events.latexChanged,
    value: $latex,
  },
});

const DescriptionFormField = reflect<{
  value: string;
  onChange: (value: React.ChangeEvent<HTMLTextAreaElement>) => void;
}>({
  view: ({ value, onChange }) => (
    <div className="flex flex-col gap-2">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        inputMode="text"
        value={value}
        onChange={onChange}
        className="h-24 resize-none rounded-md border border-black p-2 outline-none focus:border-violet-400"
      />
    </div>
  ),
  bind: {
    onChange: (event) => events.descriptionChanged(event.currentTarget.value),
    value: $description,
  },
});

const DescriptionPreview = reflect<{ description: string }>({
  view: ({ description }) =>
    description.length > 0 ? (
      <p className="break-words">{description}</p>
    ) : null,
  bind: {
    description: $description,
  },
});

const LaTexPreview = reflect<{ latex: string }>({
  view: ({ latex }) =>
    latex.length > 0 ? <MathPreview latex={latex} /> : null,
  bind: {
    latex: $latex,
  },
});
