import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { entry_id } = req.query;

  if (!mongoose.isValidObjectId(entry_id))
    return res.status(400).json({ message: "Invalid Id" });

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { entry_id } = req.query;
  await db.connect();
  const entry = await Entry.findById(entry_id);
  await db.disconnect();
  if (!entry) {
    await db.disconnect();
    return res.status(400).json({ message: `No entries with id ${entry_id}` });
  }
  return res.status(200).json(entry);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { entry_id } = req.query;
  await db.connect();

  const entryToUpdate = await Entry.findById(entry_id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: `No entries with id ${entry_id}` });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      entry_id,
      { description, status },
      { runValidators: true, new: true }
    );
    await updatedEntry!.save();
    return res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};
