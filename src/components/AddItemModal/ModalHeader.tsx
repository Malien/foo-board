import Icon from "../Icon";

interface Props {
  onClose?: () => void;
}

export default function ModalHeader({ onClose }: Props) {
  return (
    <div
      className="text-xl font-semibold text-emerald-800 px-4 py-2
        bg-emerald-300 rounded-t-xl m-0 flex justify-between items-center"
    >
      <h2 id="modal-label">Add new item</h2>
      <button className="flex items-center" onClick={onClose}>
        <Icon kind="close" className="text-4xl" />
      </button>
    </div>
  );
}
