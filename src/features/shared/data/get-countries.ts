'use server';

import db from '@/db';
import { countryTable } from '@/db/schema';

export interface CountryOption {
  id: string;
  label: string;
}

export async function getCountries(): Promise<CountryOption[]> {
  const countries = await db
    .select({
      id: countryTable.id,
      name: countryTable.name_es
    })
    .from(countryTable)
    .orderBy(countryTable.name_es);

  return countries.map((country) => ({
    id: country.id.toString(),
    label: country.name
  }));
}
