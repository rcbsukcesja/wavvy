import { ENGLISH_MONTH_NAMES, EVENT_CATEGORIES } from './mocks';

const date = new Date();
const currentMonth = date.getMonth() + 1;

export const SELECT_CATEGORY_OPTIONS = EVENT_CATEGORIES.map(category => ({
  label: category.label,
  value: category.value,
}));

const monthNamesFromCurrent = ENGLISH_MONTH_NAMES.slice(currentMonth - 1);

export const SELECT_MONTH_OPTIONS = monthNamesFromCurrent.map(month => ({
  label: month,
  value: month,
}));
