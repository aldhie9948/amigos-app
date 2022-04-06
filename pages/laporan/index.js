import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState, useRef } from 'react';
import { initLaporan } from '../../reducers/laporanReducer';
import { format } from 'date-fns';
import DataTable from 'react-data-table-component';

const Laporan = () => {
  const laporan = useSelector((state) => state.laporan);
  const dataTable = useMemo(() => {
    return laporan.map((l, index) => {
      return {
        id: index + 1,
        tanggal: l.date,
        tipe: l.type,
        nama: l.item.name,
        harga: `Rp. ${l.item.price.toLocaleString()}`,
        qty: l.qty,
        total: `Rp. ${(l.item.price * l.qty).toLocaleString()}`,
        time: l.time,
      };
    });
  }, [laporan]);
  const [filteredData, setFilteredData] = useState(null);

  const dispatch = useDispatch();

  const startDate = useRef();
  const endDate = useRef();

  const filterDateHandler = () => {
    const startArray = startDate.current.value
      .split('-')
      .map((m, i) => (i === 1 ? Number(m - 1) : Number(m)));
    const endArray = endDate.current.value
      .split('-')
      .map((m, i) => (i === 1 ? Number(m - 1) : Number(m)));
    const start = new Date(...startArray).getTime() / 1000;
    const end = new Date(...endArray).getTime() / 1000;
    const filtered = dataTable.filter((f) => {
      return f.time >= start && f.time <= end;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    dispatch(initLaporan());
    const today = format(new Date(), 'yyyy-MM-dd');
    const tenDays = format(
      new Date().setDate(new Date().getDate() + 1),
      'yyyy-MM-dd'
    );
    startDate.current.value = today;
    endDate.current.value = tenDays;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFilteredData(dataTable);
  }, [dataTable]);

  const dataTableBuilder = () => {
    const columns = [
      { name: 'No.', selector: (row) => row.id, width: 'max-content' },
      { name: 'Tanggal', selector: (row) => row.tanggal, sortable: true },
      {
        name: 'Nama',
        selector: (row) => row.nama,
        sortable: true,
        width: '12em',
      },
      { name: 'Tipe', selector: (row) => row.tipe },
      { name: 'Harga', selector: (row) => row.harga },
      { name: 'Qty', selector: (row) => row.qty, width: '5em' },
      { name: 'Total', selector: (row) => row.total, sortable: true },
    ];

    const customStyles = {
      cells: {
        style: {},
        draggingStyle: {},
      },
    };

    return {
      data: filteredData || [],
      columns,
      customStyles,
    };
  };

  return (
    <Layout title={'Laporan'}>
      <div className='grid grid-cols-1 gap-2'>
        <div className='flex justify-between gap-2'>
          <div className='w-full'>
            <small className='block'>Mulai:</small>
            <input
              type='date'
              ref={startDate}
              onChange={filterDateHandler}
              className='w-full p-1 outline-none shadow rounded bg-slate-100'
            />
          </div>
          <div className='w-full'>
            <small className='block'>Selesai:</small>
            <input
              type='date'
              ref={endDate}
              onChange={filterDateHandler}
              className='w-full p-1 outline-none shadow rounded bg-slate-100'
            />
          </div>
        </div>
        <div>
          <DataTable {...dataTableBuilder()} dense fixedHeader striped />
        </div>
      </div>
    </Layout>
  );
};

export default Laporan;
