import dbConnect from '../../../lib/dbConnect';
import Laporan from '../../../model/laporan';
import nc from 'next-connect';
import { format } from 'date-fns';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});

handler.get(async (req, res) => {
  await dbConnect();
  const {
    query: { id },
  } = req;
  if (id !== 'today') throw new Error('parameter not found');
  try {
    const today = format(new Date(), 'yyyy-MM-dd');
    const response = await Laporan.find({ date: today });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
