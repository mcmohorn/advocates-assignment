/**
 * This file is a dedicated service layer for interacting with advocate data records in the
 * database, separating this code from the routers.
 */

import db from "../../../db";
import { Advocate } from "@/db/types";
import { sql } from "drizzle-orm";

const Search = async (query: string): Promise<Advocate[]> => {
  try {
    let results: any[] = [];
    const q = query.toLowerCase();
    const rawQuery = `SELECT * FROM advocates
     WHERE (lower(first_name) LIKE '%${q}%'
     OR lower(last_name) LIKE '%${q}%'
     OR phone_number::text = '${q}'
     OR lower(city) LIKE '%${q}%'
     OR lower(degree) LIKE '%${q}%'
     OR lower(payload::text) LIKE '%${q}%'
     OR years_of_experience::text LIKE '%${q}%');`;

    // console.log('raw query is \n\n',    rawQuery)
    if (query) {
      results = await db.execute(sql.raw(rawQuery));
    } else {
      results = await db.execute(sql`SELECT * FROM advocates`);
    }

    return results.map((r) => toResource(r));
  } catch (error) {
    throw `Advocate Search failed: ${error}`;
  }
};

const toResource = (a: any): Advocate => {
  return {
    id: a.id,
    firstName: a.first_name,
    lastName: a.last_name,
    yearsOfExperience: a.years_of_experience,
    specialties: JSON.parse(a.payload),
    city: a.city,
    degree: a.degree,
    phoneNumber: a.phone_number,
  };
};

export { Search };
