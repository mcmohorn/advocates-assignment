import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { Search } from "./service";
export async function GET(req: NextApiRequest) {
  // TODO: extract query normally with?
  // const {q} = req.query
  const q = decodeURI(req.url?.split("=")[1] || "");

  try {
    const data = await Search(q);

    return Response.json({ data });
  } catch (error) {
    console.log('error' , error);
    return Response.error();
  }
}
