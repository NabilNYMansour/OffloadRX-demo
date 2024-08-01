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
  postal: string;
  lot: string;
};
