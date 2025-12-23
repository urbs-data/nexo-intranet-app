'use server';

import { countryTable } from '@/db/schema';
import { authActionClient } from '@/lib/actions/safe-action';

export interface CountryOption {
  id: string;
  label: string;
}

export const getCountries = authActionClient
  .metadata({ actionName: 'getCountries' })
  .action(async ({ ctx }) => {
    const countries = await ctx.db
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
  });
