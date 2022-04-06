import dbConnect from "../../../lib/dbConnect";
import Konsol from "../../../model/konsol";
import nc from "next-connect";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await dbConnect();
  try {
    const response = await Konsol.findByIdAndRemove(id);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

handler.put(async (req, res) => {
  const {
    query: { id },
  } = req;
  await dbConnect();
  try {
    const body = req.body;
    const response = await Konsol.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
