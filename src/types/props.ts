export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

export type ClientSearchParams = Promise<SearchParams>;
