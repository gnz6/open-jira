import type { NextApiRequest, NextApiResponse } from "next";
import { getEnabledCategories } from "trace_events";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import { EntryStatus } from "../../../interfaces/entry";

type Data = { message: string } | IEntry[] | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);
    
    default:
      return res.status(400).json({ message: "Invalid Endpoint" });
  }
}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect();

  const entries = await Entry.find().sort({ createdAt: "ascending" });

  await db.disconnect();

  return res.status(200).json(entries);
};

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description = "" } = req.body;
  const entry = new Entry({
    description,
    createdAt: Date.now(),
    status:"pending"
  });

  try {
    await db.connect();

    await entry.save();

    await db.disconnect();

    return res.status(201).json(entry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, check server console" });
  }
};
