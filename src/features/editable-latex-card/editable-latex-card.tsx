import { Card, MathField, MathPreview } from '@math-editor/shared/ui';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { events } from './model';

type EditableLaTexCardProps = {
  latex: string;
  id: string;
  description: string;
};

export const EditableLaTexCard = ({
  latex,
  id,
  description,
}: EditableLaTexCardProps) => {
  const saveEditedLatex = useUnit(events.editingLatexSaved);
  const [isEditMode, setEditMode] = useState(false);
  const [editLatex, setEditLatex] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEditLatex = (value: string) => {
    setEditLatex(value);
  };

  const handleEditDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditDescription(event.currentTarget.value);
  };

  const handleEnableEditMode = () => {
    setEditMode(true);
    setEditLatex(latex);
    setEditDescription(description);
  };

  const handleCancelEditingLatex = () => {
    setEditMode(false);
  };

  const handleSaveEditedLatex = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditMode(false);
    saveEditedLatex({ id, latex: editLatex, description: editDescription });
  };

  const descriptionValue = isEditMode ? editDescription : description;
  const latexValue = isEditMode ? editLatex : latex;
  const isShowDescription = isEditMode
    ? editDescription.length > 0
    : description.length > 0;

  return (
    <Card className="flex flex-col gap-8 overflow-x-auto">
      {isShowDescription && (
        <textarea
          id="description"
          name="description"
          inputMode="text"
          value={descriptionValue}
          readOnly={true}
          className="h-max resize-none rounded-md p-2 outline-none"
        />
      )}
      <MathPreview latex={latexValue} />
      {isEditMode ? (
        <form onSubmit={handleSaveEditedLatex} className="flex flex-col gap-3">
          <textarea
            id="description"
            name="description"
            inputMode="text"
            value={editDescription}
            onChange={handleEditDescription}
            className="h-24 resize-none rounded-md border border-black p-2 outline-none focus:border-violet-400"
          />
          <MathField value={editLatex} onChange={handleEditLatex} />
          <div className="mt-4 flex items-center gap-3">
            <button type="submit" className="btn">
              Save
            </button>
            <button
              onClick={handleCancelEditingLatex}
              type="button"
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleEnableEditMode} type="button" className="btn">
          Edit
        </button>
      )}
    </Card>
  );
};
