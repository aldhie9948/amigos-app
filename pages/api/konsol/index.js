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

handler.get(async (req, res) => {
  await dbConnect();
  try {
    const response = await Konsol.find({});
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

handler.post(async (req, res) => {
  await dbConnect();
  const body = req.body;
  const newKonsol = new Konsol(body);
  try {
    const response = await newKonsol.save();
    res.status(201).json(response);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
