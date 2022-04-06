import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import { initKonsol, playUnit } from '../../reducers/konsolReducer';
import { SiPlaystation3, SiPlaystation4 } from 'react-icons/si';
import { AiOutlinePlayCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsStopCircle } from 'react-icons/bs';
import sweetalert from '../../lib/sweetalert';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { format } from 'date-fns';
import IDLocale from 'date-fns/locale/id';
import { MdFastfood, MdPriceCheck } from 'react-icons/md';
import { initMenuList } from '../../reducers/menuReducer';
import { useField } from '../../hooks';
import { saveLaporan } from '../../reducers/laporanReducer';
import Modal from '../../components/Modal';
import Image from 'next/image';
import Logo from '../../assets/img/logo.png';

const getPrice = (time = 0, unit = 'PS3') => {
  const playTimeInMinutes = Math.ceil(time / 60);
  if (unit === 'PS3') {
    if (playTimeInMinutes === 1 * 60) return 5000;
    if (playTimeInMinutes === 3 * 60) return 12000;
    if (playTimeInMinutes === 5 * 60) return 20000;
    if (playTimeInMinutes === 10 * 60) return 35000;
    return playTimeInMinutes * (5000 / 60);
  } else if (unit === 'PS4') {
    if (playTimeInMinutes === 1 * 60) return 8000;
    if (playTimeInMinutes === 3 * 60) return 22000;
    if (playTimeInMinutes === 5 * 60) return 35000;
    if (playTimeInMinutes === 10 * 60) return 65000;
    return playTimeInMinutes * (8000 / 60);
  }
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showModalsPayment, setShowModalsPayment] = useState(false);
  const konsol = useSelector((state) => state.konsol);
  const menu = useSelector((state) => state.menu);
  const [selectedKonsol, setSelectedKonsol] = useState(null);

  useEffect(() => {
    dispatch(initKonsol());
    dispatch(initMenuList());
    //  eslint-disable-next-line
  }, []);

  const playHandler = (e) => {
    const id = e.currentTarget.value;
    const obj = konsol.find((f) => f.id === id);
    const start = Math.floor(new Date().getTime() / 1000);
    const update = {
      ...obj,
      isActive: true,
      start,
      end: 0,
      price: 0,
    };
    dispatch(playUnit(update));
  };

  const stopHandler = (e) => {
    const id = e.currentTarget.value;
    sweetalert.confirm(() => {
      const obj = konsol.find((f) => f.id === id);
      const end =
        obj.end === 0 ? Math.floor(new Date().getTime() / 1000) : obj.end;
      const time = end - obj.start;
      const price = Math.ceil(getPrice(time, obj.type));
      const update = {
        ...obj,
        isActive: false,
        price,
        end,
      };
      dispatch(playUnit(update));
    });
  };

  const timeoutPrice = (konsol) => {
    const end = Math.floor(new Date().getTime() / 1000);
    const time = end - konsol.start;
    const price = Math.ceil(getPrice(time, konsol.type));
    return price.toLocaleString();
  };

  const RealtimePrice = ({ konsol }) => {
    const [price, setPrice] = useState(0);
    setInterval(() => {
      setPrice(timeoutPrice(konsol));
    }, 1000);
    return <span>Rp. {price}</span>;
  };

  const paymentHandler = (e) => {
    setShowModalsPayment(!showModalsPayment);
    setSelectedKonsol(konsol.find((f) => f.id === e.currentTarget.value));
    return;
  };

  const closeModalHandler = () => {
    setShowModalsPayment(!showModalsPayment);
    setSelectedKonsol(null);
  };

  const SelectPackages = ({ id }) => {
    const [selected, setSelected] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const selectChangeHandler = (e) => {
      setSelected(e.currentTarget.value);
      setButtonDisabled(false);
    };

    const clickHandler = (e) => {
      const id = e.currentTarget.value;
      const obj = konsol.find((f) => f.id === id);
      const start = Math.floor(new Date().getTime() / 1000);
      let today = new Date();
      const end = Math.floor(
        today.setHours(today.getHours() + Number(selected)) / 1000
      );
      const time = end - start;
      const price = Math.ceil(getPrice(time, obj.type));

      const update = {
        ...obj,
        isActive: true,
        start,
        end,
        price,
      };
      dispatch(playUnit(update));
    };

    return (
      <div className='my-2 flex gap-2'>
        <div className='flex-grow'>
          <select
            onChange={selectChangeHandler}
            className='w-full outline-none rounded text-black p-[0.4rem] bg-slate-300'
          >
            <option value='' disabled hidden selected>
              Pilih Paket...
            </option>
            <option value='1'>1 Jam</option>
            <option value='3'>3 Jam</option>
            <option value='5'>5 Jam</option>
            <option value='10'>10 Jam</option>
          </select>
        </div>
        <div className='my-auto'>
          <button
            className='bg-green-300 p-2 rounded text-black cursor-pointer active:bg-slate-500 disabled:bg-slate-300'
            value={id}
            onClick={clickHandler}
            disabled={buttonDisabled}
          >
            <AiOutlineCheckCircle />
          </button>
        </div>
      </div>
    );
  };

  const Pembelian = ({ menu }) => {
    const selectedItem = useField('text');
    const qty = useField('number');

    const menuHandler = async () => {
      const item = menu.find((f) => f.id === selectedItem.attr.value);
      if (!qty.attr.value && !item)
        return sweetalert.toast('Pilih menu dan masukkan qty item', false);
      const type = 'produk';
      const total = item.price * qty.attr.value;
      const time = Math.floor(new Date().getTime() / 1000);
      const date = format(new Date(), 'yyyy-MM-dd');
      const order = {
        item,
        qty: qty.attr.value,
        total,
        type,
        time,
        date,
      };

      sweetalert.confirm(() => {
        try {
          dispatch(saveLaporan(order));
          sweetalert.toast('Berhasil tersimpan');
          selectedItem.reset();
          qty.reset();
        } catch (error) {
          sweetalert.toast(error.toString(), false);
        }
      });
    };

    const setPrice = () => {
      const item = menu.find((f) => f.id === selectedItem.attr.value);
      if (selectedItem.attr.value && qty.attr.value)
        return Number(item.price * qty.attr.value).toLocaleString();
      return 0;
    };

    return (
      <div className='my-4 p-2 rounded border bg-border-slate-500'>
        <strong className='flex gap-2 bg-white max-w-max mt-[-1.3em]'>
          <MdFastfood className='text-lg text-orange-500' />{' '}
          <div className='my-auto'>Penjualan</div>
        </strong>
        <div className='my-4'>
          <div className='flex gap-2 border p-2 text-white rounded shadow bg-green-500'>
            <MdFastfood className='my-auto' />
            <select
              {...selectedItem.attr}
              className='block rounded text-black flex-grow  outline-none capitalize'
            >
              <option value='' hidden selected disabled>
                Pilih menu...
              </option>
              {menu &&
                menu.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} - Rp.{m.price.toLocaleString()}
                  </option>
                ))}
            </select>
            <input
              {...qty.attr}
              className='block w-14 rounded pl-2 outline-none text-black'
              placeholder='Qty'
              min='0'
            />
          </div>
          <div className='flex justify-end'>
            <button
              title='Simpan'
              onClick={menuHandler}
              className='bg-green-500 whitespace-nowrap flex gap-2 rounded shadow p-1 px-4 mt-2 text-white'
            >
              <MdPriceCheck className='my-auto' size='1.3em' />
              <div className='my-auto white'>Rp. {setPrice()}</div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PaymentUnit = ({ selectedKonsol }) => {
    const [price, setPrice] = useState(
      selectedKonsol.price && selectedKonsol.price
    );

    const proccessPaymentHandler = () => {
      const update = {
        ...selectedKonsol,
        isActive: false,
        price: Number(price),
      };
      const payment = {
        item: update,
        qty: 1,
        total: price,
        type: 'rental',
        time: Math.floor(new Date().getTime() / 1000),
        date: format(new Date(), 'yyyy-MM-dd'),
      };

      if (Object.values(update).filter((f) => f === '').length > 0)
        return sweetalert.toast(
          'data tidak lengkap, pembayaran tidak bisa diproses',
          false
        );
      sweetalert.confirm(() => {
        try {
          dispatch(saveLaporan(payment));
          dispatch(playUnit(update));
          sweetalert.toast('Pembayaran berhasil');
          setShowModalsPayment(!showModalsPayment);
        } catch (error) {
          sweetalert.toast(error.message.toString());
        }
      });
    };

    return (
      <div>
        <div>
          <Image src={Logo} alt='logo amigos playstation' />
        </div>
        <strong className='text-center block text-3xl'>Tagihan Rental</strong>

        <hr className='my-2' />
        <div className='grid grid-cols-2 gap-2 font-bold'>
          <div className=''>Tanggal Tagihan : </div>
          <div className=''>{format(new Date(), 'yyyy-MM-dd, HH:mm:ss')}</div>
          <div className=''>Unit : </div>
          <div className=''>{selectedKonsol.name}</div>
          <div className=''>Status : </div>
          <div className=''>
            {selectedKonsol.isActive ? 'Belum Selesai' : 'Selesai'}
          </div>
          <div className=''>Mulai : </div>
          <div className=''>
            {selectedKonsol.start &&
              format(selectedKonsol.start * 1000, 'yyyy-MM-dd, HH:mm:ss')}
          </div>
          <div className=''>Selesai : </div>
          <div className=''>
            {selectedKonsol.end &&
              format(selectedKonsol.end * 1000, 'yyyy-MM-dd, HH:mm:ss')}
          </div>
          <div className=''>Harga : </div>
          <div className=''>
            <div className='p-1 rounded flex gap-2'>
              <div className='my-auto'>Rp.</div>
              <div>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.currentTarget.value)}
                  type='number'
                  className='w-full outline-none border rounded pl-2 py-1 bg-slate-100 shadow'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end py-5'>
          <button
            onClick={proccessPaymentHandler}
            className='bg-green-500 text-white p-2 rounded shadow px-10 flex gap-2'
          >
            <RiMoneyDollarCircleLine className='my-auto' size='1.4em' />
            <div className='my-auto'>Bayar</div>
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout title='Dashboard'>
      <Pembelian menu={menu} />
      <div className='grid grid-cols-2 gap-2'>
        {konsol &&
          konsol.map((k, index) => (
            <div
              key={k.id}
              className={`${
                k.type === 'PS3' ? 'bg-slate-700' : 'bg-blue-700'
              } text-white rounded p-3 shadow`}
            >
              {k.type === 'PS3' ? (
                <SiPlaystation3 size='5em' className='mx-auto' />
              ) : (
                <SiPlaystation4 size='5em' className='mx-auto' />
              )}
              <div className='flex flex-col gap-2'>
                <div
                  className={`flex justify-between ${
                    k.isActive ? 'bg-green-200' : 'bg-white'
                  } text-black p-1 rounded`}
                >
                  <div>Start:</div>
                  <div>
                    {k.start
                      ? format(k.start * 1000, 'kk:mm:ss', {
                          locale: IDLocale,
                        })
                      : '00:00:00'}
                  </div>
                </div>
                <div
                  className={`flex justify-between ${
                    k.isActive ? 'bg-green-200' : 'bg-white'
                  } text-black p-1 rounded`}
                >
                  <div>End:</div>
                  <div>
                    {k.end
                      ? format(k.end * 1000, 'kk:mm:ss', {
                          locale: IDLocale,
                        })
                      : '00:00:00'}
                  </div>
                </div>
              </div>

              <SelectPackages id={k.id} />

              <div className='my-2'>
                <small className='block text-center'>Unit {k.name}</small>
                <div className='text-center font-bold'>
                  {/* Rp. {k.price ? k.price.toLocaleString() : 0} */}
                  {k.isActive && k.end === 0 ? (
                    <RealtimePrice konsol={k} />
                  ) : (
                    `Rp. ${k.price.toLocaleString()}`
                  )}
                </div>
              </div>
              <hr className='mb-2' />
              <div className='button-wrapper flex gap-2 justify-around'>
                <button
                  className='p-2 bg-white rounded shadow text-black'
                  title={!k.isActive ? 'Mulai' : 'Berhenti'}
                  onClick={k.isActive ? stopHandler : playHandler}
                  value={k.id}
                >
                  {k.isActive ? (
                    <BsStopCircle className='text-[1.3em]' />
                  ) : (
                    <AiOutlinePlayCircle className='text-[1.3em]' />
                  )}
                </button>
                <button
                  className='p-2 bg-white rounded shadow text-black'
                  title='Bayar'
                  onClick={paymentHandler}
                  value={k.id}
                >
                  <RiMoneyDollarCircleLine className='text-[1.3em]' />
                </button>
              </div>
            </div>
          ))}
      </div>
      {showModalsPayment && (
        <Modal title='Pembayaran' closeHandler={closeModalHandler}>
          {selectedKonsol && <PaymentUnit selectedKonsol={selectedKonsol} />}
        </Modal>
      )}
    </Layout>
  );
};

export default Dashboard;
