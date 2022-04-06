import { AiFillCloseCircle } from 'react-icons/ai';

const Modal = ({ title = '', closeHandler = () => {}, children }) => {
  return (
    <div className='modal fixed flex justify-center align-middle top-0 left-0 right-0 bottom-0 bg-overlay z-[100]'>
      <div className='modal-dialog mx-10 my-20 rounded bg-white w-full relative flex flex-col'>
        <div className='modal-title flex justify-between shadow-lg p-4'>
          <div className='font-bold'>{title}</div>
          <div>
            <AiFillCloseCircle
              onClick={closeHandler}
              className='text-[1.3em] text-red-500 hover:opacity-80 active:text-red-700 cursor-pointer'
            />
          </div>
        </div>
        <div className='modal-body flex-grow overflow-y-auto p-4'>
          {children}
        </div>
        <div className='modal-title flex justify-end border-t-2 px-4 py-2'>
          <button
            onClick={closeHandler}
            className=' bg-slate-300 px-5 py-1 rounded shadow'
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
