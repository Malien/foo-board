import React, { useState } from "react";
import Modal from "react-modal";
import { Board, Card } from "../../board";
import Icon from "../Icon";
import BoardSelect from "./BoardSelect";
import DescriptionField from "./DescriptionField";
import FilledButton from "./FilledButton";
import ModalHeader from "./ModalHeader";
import OutlinedButton from "./OutlinedButton";
import TitleField from "./TitleField";
import useInput from "./useInput";

const MAX_TITLE = 50;
const MAX_DESCRIPTION = 500;

export type CardTemplate = Omit<Card, "id" | "order">;

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
        base:
          "absolute max-w-lg w-full left-[50%] top-[50%] translate-x-[-50%] " +
          "translate-y-[-50%] bg-white shadow-xl rounded-xl",
        afterOpen: "",
        beforeClose: "",
      }}
    >
      <ModalHeader onClose={onClose} />

      <form onSubmit={handleSubmit} className="px-4 py-2">
        <TitleField
          {...titleProps}
          {...titleValidation}
          maxLength={MAX_TITLE}
        />
        <BoardSelect boardId={boardId} onChange={setBoardId} boards={boards} />
        <DescriptionField
          {...descriptionProps}
          {...descriptionValidation}
          maxLength={MAX_DESCRIPTION}
        />

        <div className="flex justify-end mb-2">
          <OutlinedButton className="mr-4" onClick={onClose}>
            Cancel
          </OutlinedButton>
          <FilledButton type="submit">
            <Icon kind="add" /> Add
          </FilledButton>
        </div>
      </form>
    </Modal>
  );
}
