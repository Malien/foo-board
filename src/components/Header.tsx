
interface Props {
  onNewItem?: () => void;
}

export default function Header({ onNewItem }: Props) {
  return (
    <header className="bg-emerald-300">
      <div
        className="m-auto max-w-screen-xl py-2 px-6 flex justify-between 
          text-2xl font-semibold items-center"
      >
        FooBoard
        <button
          className="appearance-none border-none py-1 px-6 relative m-0 
            bg-white font-medium text-xl rounded-md cursor-pointer 
            after:absolute after:inset-0 after:opacity-0 after:rounded-md 
            after:transition-opacity after:ease-in after:duration-100
            before:absolute before:inset-0 before:opacity-0 before:rounded-md 
            before:transition-opacity before:ease-in before:duration-100
            before:bg-emerald-400 after:border-solid after:border-[1px] 
            after:border-emerald-400 hover:before:opacity-[0.15]
            active:after:opacity-100 active:before:opacity-25"
          onClick={onNewItem}
        >
          Add new item
        </button>
      </div>
  </header>
  );
}
