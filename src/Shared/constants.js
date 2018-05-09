export const BASE_PATH = process.env.REACT_APP_API_URL;
export const NUMBER_FORMAT = '0a';
export const NUMBER_FORMAT_SINGLE_DECIMAL = '0.0a';
export const FILTER_VALUE_SHOW_ALL = 'ShowAll';

export const defaultWidgetTableState = {
  isLoading: false,
  error: null,
  data: [],
  totalCount: 0,
  pageSize: 5,
  activeFilter: FILTER_VALUE_SHOW_ALL,
  activePage: 1,
  sort: {
    direction: 'asc',
    column: 'status',
  },
};

export const defaultAppData = {
  user: {
    id: null,
  },
};
