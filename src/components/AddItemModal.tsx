import classNames from "classnames";
import React, { RefObject, useRef, useState } from "react";
import Modal from "react-modal";
import { Board, Card } from "../board";
import CharRestrictionIndicator from "./CharRestrictionIndicator";
import Icon from "./Icon";
import Label from "./Label";

const MAX_TITLE = 50;
const MAX_DESCRIPTION = 500;

function useInput(initialValue: string, maxLength: number) {
  const [value, setValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);
  const ref = useRef<HTMLElement>(null);

  const onChange = (e: React.ChangeEvent<{ value: string }>) => {
    setValue(e.target.value);
    if (e.target.value.length <= maxLength) {
      setIsValid(true);
    }
  };
  const onBlur = (e: React.FocusEvent<{ value: string }>) => {
    if (value.length > maxLength) {
      setIsValid(false);
    }
  };

  const validate = () => {
    if (value.length > maxLength) {
      setIsValid(false);
      ref.current?.focus();
      return false;
    }
    return isValid;
  };

  return [
    { value, onBlur, onChange, ref: ref as React.Ref<any> },
    {
      isValid,
      errorMessage: isValid ? undefined : "Too many characters",
      validate,
    },
  ] as const;
}

export type CardTemplate = Omit<Card, "id" | "order">

interface Props {
  onClose?: () => void;
  onCreate?: (newCard: CardTemplate) => void;
  boards: Board[];
  defaultBoardId: number;
}

export default function AddItemModal({
  onClose,
  onCreate,
  boards,
  defaultBoardId,
}: Props) {
  const [titleProps, titleValidation] = useInput("", MAX_TITLE);
  const [boardId, setBoardId] = useState(defaultBoardId);
  const [descriptionProps, descriptionValidation] = useInput(
    "",
    MAX_DESCRIPTION
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleValidation.validate() && descriptionValidation.validate()) {
      onCreate?.({
        boardId,
        description: descriptionProps.value,
        title: titleProps.value,
      });
    }
  };

  const handleBoardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const boardId = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(boardId)) setBoardId(boardId);
  };

  return (
    <Modal
      isOpen
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={onClose}
      appElement={document.getElementById("root")!}
      aria={{
        labelledby: "modal-label",
      }}
      className={{
        base: "absolute max-w-lg w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl rounded-xl",
        afterOpen: "",
        beforeClose: "",
      }}
    >
      <div className="text-xl font-semibold text-emerald-800 px-4 py-2 bg-emerald-300 rounded-t-xl m-0">
        <h2 id="modal-label">Add new item</h2>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-2">
        <Label
          label="Title*"
          invalid={!titleValidation.isValid}
          className="mb-8"
        >
          <input
            name="title"
            required
            className="w-full outline-none px-4 py-2 [background:none]"
            // maxLength={MAX_TITLE}
            {...titleProps}
          />
          <CharRestrictionIndicator
            length={titleProps.value.length}
            maxLength={MAX_TITLE}
          />
          {titleValidation.errorMessage && (
            <div className="absolute left-0 -bottom-[18px] text-rose-600 px-1 text-sm">
              {titleValidation.errorMessage}
            </div>
          )}
        </Label>

        <Label label="Board*">
          <select
            name="board"
            required
            value={boardId}
            onChange={handleBoardChange}
            className="w-full outline-none px-4 py-2 [background:none] appearance-none cursor-pointer"
          >
            {boards.map(board => (
              <option key={board.id} value={board.id}>
                {board.name}
              </option>
            ))}
          </select>
        </Label>

        <Label
          label="Description"
          invalid={!descriptionValidation.isValid}
          className="mb-8"
        >
          <textarea
            name="description"
            // maxLength={MAX_DESCRIPTION}
            className="w-full h-full px-3 py-2 outline-none min-h-[150px]"
            {...descriptionProps}
          />
          <CharRestrictionIndicator
            length={descriptionProps.value.length}
            maxLength={MAX_DESCRIPTION}
          />
          {descriptionValidation.errorMessage && (
            <div className="absolute left-0 -bottom-5 text-rose-600">
              {descriptionValidation.errorMessage}
            </div>
          )}
        </Label>

        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={onClose}
            className="text-lg px-4 py-1 relative before:pointer-events-none 
            before:absolute before:inset-0 before:bg-emerald-400
            before:rounded-md before:opacity-0 before:transition-opacity
            before:duration-200 hover:before:opacity-20 after:absolute 
            after:pointer-events-none after:inset-0 after:border-2
            after:border-emerald-800 after:rounded-md after:opacity-30
            after:transition-opacity after:duration-200 hover:after:opacity-40
            active:before:opacity-40 focus:before:opacity-20 font-medium
            focus:after:opacity-80 active:after:opacity-100 outline-none mr-4"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="text-lg pl-4 pr-6 py-1 relative before:pointer-events-none 
            before:absolute before:inset-0 before:bg-emerald-500
            before:rounded-md before:opacity-80 before:transition-opacity
            before:duration-200 hover:before:opacity-90 after:absolute 
            after:pointer-events-none after:inset-0 after:border-2
            after:border-emerald-800 after:rounded-md after:opacity-30
            after:transition-opacity after:duration-200 hover:after:opacity-40
            active:before:opacity-100 focus:before:opacity-80 
            focus:after:opacity-80 active:after:opacity-100 outline-none
            flex font-medium text-white"
          >
            <div className="z-10 flex items-center">
              <Icon kind="add" /> Add
            </div>
          </button>
        </div>
      </form>
    </Modal>
  );
}
