import Layout from '../../components/Layout';
import {
  MdAddShoppingCart,
  MdShoppingCart,
  MdPlaylistAddCheck,
  MdAttachMoney,
  MdOutlineSave,
  MdFastfood,
  MdLocalDrink,
  MdDeleteForever,
  MdEditNote,
} from 'react-icons/md';
import { useField } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  createMenu,
  deleteMenu,
  initMenuList,
  updateMenu,
} from '../../reducers/menuReducer';
import sweetalert from '../../lib/sweetalert';

const Makanan = () => {
  const namaMenu = useField('text');
  const tipeMenu = useField('text');
  const hargaMenu = useField('number');
  const idMenu = useField('hidden');
  const dispatch = useDispatch();
  const menuList = useSelector((state) => state.menu);
  const [visibleForm, setVisibleForm] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    dispatch(initMenuList());
    // eslint-disable-next-line
  }, []);

  const resetForm = () => {
    namaMenu.reset();
    tipeMenu.reset();
    hargaMenu.reset();
  };

  const addMenuHandler = () => {
    setVisibleForm(!visibleForm);
    resetForm();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newMenu = {
      name: namaMenu.attr.value,
      price: hargaMenu.attr.value,
      type: tipeMenu.attr.value,
    };

    if (isUpdate) newMenu.id = idMenu.attr.value;
    try {
      isUpdate ? dispatch(updateMenu(newMenu)) : dispatch(createMenu(newMenu));
      resetForm();
      setIsUpdate(false);
      setVisibleForm(!visibleForm);
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const DaftarMenu = ({ menu, index }) => {
    const bgType =
      menu.type === 'makanan'
        ? 'bg-red-400'
        : menu.type === 'minuman'
        ? 'bg-blue-400'
        : 'bg-slate-400';
    const IconType =
      menu.type === 'makanan'
        ? MdFastfood
        : menu.type === 'minuman'
        ? MdLocalDrink
        : MdShoppingCart;

    const deleteHandler = async (e) => {
      const id = e.currentTarget.value;
      sweetalert.confirm(() => {
        dispatch(deleteMenu(id));
      });
    };

    return (
      <div className={`${bgType} rounded shadow p-2 `}>
        <div className='flex  gap-2'>
          <div className='my-auto'>{index + 1}.</div>
          <div className='my-auto'>
            <IconType size='1.2em' />
          </div>
          <div className='flex-grow capitalize my-auto'>
            {menu.name} - Rp. {menu.price.toLocaleString()}
          </div>
          <button
            className='block my-auto mx-2'
            title='Edit'
            onClick={editHandler}
            value={menu.id}
          >
            <MdEditNote size='1.2em' />
          </button>
          <button
            onClick={deleteHandler}
            className='block my-auto'
            title='Hapus'
            value={menu.id}
          >
            <MdDeleteForever size='1.2em' />
          </button>
        </div>
      </div>
    );
  };

  const editHandler = (e) => {
    const id = e.currentTarget.value;
    const menu = menuList.find((f) => f.id === id);
    console.log(menu);
    namaMenu.setValue(menu.name);
    tipeMenu.setValue(menu.type);
    hargaMenu.setValue(menu.price);
    idMenu.setValue(menu.id);
    setIsUpdate(true);
    setVisibleForm(true);
  };

  const setBoderByValue = (value) => {
    if (value) return 'border-green-500';
    return 'border-red-500';
  };

  return (
    <Layout title='Menu'>
      <button
        onClick={addMenuHandler}
        className='flex gap-2 mb-2 bg-green-500 text-white p-2 rounded shadow active:bg-green-700 hover:opacity-80'
      >
        <MdAddShoppingCart className='text-[1.3em]' />
        <div className='my-auto'>Tambah Menu</div>
      </button>
      {visibleForm && (
        <form
          onSubmit={submitHandler}
          className='p-4 bg-slate-300 rounded shadow'
        >
          <input {...idMenu.attr} />
          <div className='flex justify-center gap-2 font-bold text-xl'>
            <MdFastfood size='1.5em' />
            <div className='my-auto'>Tambah Menu</div>
          </div>
          <hr className='my-2' />
          <div>
            <div className='flex flex-col mb-2'>
              <div className='font-bold'>Nama:</div>
              <div
                className={`${setBoderByValue(
                  namaMenu.attr.value
                )} flex gap-5 bg-white border p-2 rounded shadow`}
              >
                <MdShoppingCart className='my-auto text-[1.3em]' />
                <input
                  className='block outline-none flex-grow'
                  placeholder='Nama menu'
                  {...namaMenu.attr}
                  required={true}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-5'>
              <div>
                <div className='font-bold'>Tipe:</div>
                <div
                  className={`flex gap-2 border bg-white p-2 rounded shadow ${setBoderByValue(
                    tipeMenu.attr.value
                  )}`}
                >
                  <MdPlaylistAddCheck className='my-auto text-[1.3em]' />
                  <select
                    {...tipeMenu.attr}
                    className='w-full outline-none p-1 bg-white text-black'
                  >
                    <option value='' hidden selected disabled>
                      Tipe menu
                    </option>
                    <option value='makanan'>Makanan</option>
                    <option value='minuman'>Minuman</option>
                    <option value='Lainnya'>Lainnya</option>
                  </select>
                </div>
              </div>
              <div>
                <div className='font-bold'>Harga:</div>
                <div
                  className={`flex gap-2 border bg-white p-2 rounded shadow ${setBoderByValue(
                    hargaMenu.attr.value
                  )}`}
                >
                  <MdAttachMoney className='my-auto text-[1.3em]' />
                  <input
                    className='block outline-none w-full'
                    placeholder='Harga'
                    {...hargaMenu.attr}
                    required={true}
                    min='0'
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end my-2 '>
              <button
                type='submit'
                className='bg-blue-500 text-white p-2 px-4 rounded shadow flex gap-2'
              >
                <MdOutlineSave size='1.3em' />
                <div>Simpan</div>
              </button>
            </div>
          </div>
        </form>
      )}
      <div className='my-2 flex flex-col gap-2'>
        <strong>Daftar Menu</strong>
        {menuList.map((menu, index) => (
          <DaftarMenu key={menu.id} menu={menu} index={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Makanan;
