export type SearchParams = { [key: string]: string | string[] | undefined };
export type GeneralParams = {
  search: string;
  sort: string;
  page: number;
};
export type FiltersParams = {
  type: string;
  pf: string;
  pt: string;
  pr: string;
  er: string;
};
export type AdvancedSearchParams = {
  name: string;
  composition: string;
  city: string;
  zip: string;
  lot: string;
};

export type Params = {
  search: string;
  sort: string;
  page: number;
  type: string;
  pf: string;
  pt: string;
  pr: string;
  er: string;
  name: string;
  composition: string;
  city: string;
  zip: string;
  lot: string;
};