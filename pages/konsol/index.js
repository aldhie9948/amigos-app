import Layout from '../../components/Layout';
import { SiPlaystation3, SiPlaystation4 } from 'react-icons/si';
import { BiAddToQueue } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { addUnit, deleteUnit, initKonsol } from '../../reducers/konsolReducer';
import { useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import sweetalert from '../../lib/sweetalert';

const Konsol = () => {
  const dispatch = useDispatch();
  const konsol = useSelector((state) => state.konsol);

  useEffect(() => {
    dispatch(initKonsol());

    // eslint-disable-next-line
  }, []);

  const addUnitHandler = (e) => {
    const type = e.currentTarget.value;
    const obj = {
      type,
      isActive: false,
      name: `${type}-${konsol.filter((f) => f.type === type).length + 1}`,
      price: 0,
      start: null,
      end: null,
    };
    dispatch(addUnit(obj));
    sweetalert.toast('Unit ditambah!');
  };

  const deleteUnitHandler = (e) => {
    const id = e.currentTarget.value;
    sweetalert.confirm(() => {
      dispatch(deleteUnit(id));
    });
  };

  const konsolLength = (type) => {
    return konsol && konsol.filter((f) => f.type === type).length;
  };

  return (
    <Layout title='Konsol'>
      <div className='grid grid-cols-1 gap-2 my-2'>
        <div className='bg-slate-700 p-4 rounded shadow text-white grid gap-2 grid-cols-3'>
          <div className='col-span-1'>
            <SiPlaystation3 size='5em' />
          </div>
          <div className='col-span-2'>
            <strong className='block text-xl mb-2'>
              {konsol && konsolLength('PS3')} Unit
            </strong>
            <button
              value='PS3'
              onClick={addUnitHandler}
              className='border-2 active:bg-white active:text-black rounded p-1 px-4 flex gap-2'
            >
              <BiAddToQueue size='1.2em' />
              <span className='my-auto block'>Tambah Unit</span>
            </button>
          </div>
        </div>

        <div className='bg-blue-700 p-4 rounded shadow text-white grid gap-2 grid-cols-3'>
          <div className='col-span-1'>
            <SiPlaystation4 size='5em' />
          </div>
          <div className='col-span-2'>
            <strong className='block text-xl mb-2'>
              {konsol && konsolLength('PS4')} Unit
            </strong>
            <button
              value='PS4'
              onClick={addUnitHandler}
              className='border-2 active:bg-white active:text-black rounded p-1 px-4 flex gap-2'
            >
              <BiAddToQueue size='1.2em' />
              <span className='my-auto block'>Tambah Unit</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <strong>Daftar Unit</strong>
        {konsol &&
          konsol.map((k, index) => (
            <div
              key={k.id}
              className={`flex rounded text-white shadow p-2 my-1 ${
                k.type === 'PS3' ? 'bg-slate-700' : 'bg-blue-700'
              }`}
            >
              <div className='flex-grow'>
                {index + 1}.{' '}
                {k.type === 'PS3' ? 'Playstation 3' : 'Playstation 4'}{' '}
                {`[${k.name}]`}
              </div>
              <div className='my-auto'>
                <button onClick={deleteUnitHandler} value={k.id}>
                  <AiFillDelete className='text-white text-lg' />
                </button>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Konsol;
