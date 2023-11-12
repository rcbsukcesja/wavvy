export type ListApiResponse<T> = {
  content: T[];
} & Pagination;

export type Pagination = {
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
};
