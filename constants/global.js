export const FULL_TIME = 1;
export const PART_TIME = 2;
export const CORRESPONDENCE = 3;

export const TYPE_FACULTY = 1;
export const TYPE_PROGRAM = 2;

export const LEVEL_BACHELOR = 2;
export const LEVEL_MAGISTRAT = 1;

export const BASE_EDUCATION_PROGRAMS_FILTER = `&filters[level_education_id]=`;
export const BASE_FEEDBACK_PROGRAMS_FILTER = `&filters[status]=`;

export const morePages = {
  base: "1",
  educationPrograms: "2",
  publishingPrograms: "3",
  recovery: "4",
  portfolioAchievements: "5",
  moreDirectory: "6",
  undergraduate: "7",
  master: "8",
  KCP: "9",
  prices: "10",
  datesOfReceipt: "11",
  KCPMore: "12",
  olympic: "13",
};

export const morePagesNames = {
  [morePages.base]: "Базовые справочники",
  [morePages.educationPrograms]: "Образовательные программы",
  [morePages.publishingPrograms]: "Публикация программ",
  [morePages.recovery]: "Переводы и восстановления",
  [morePages.portfolioAchievements]:
    "Учет портфолио и индивидуальных достижений",
  [morePages.moreDirectory]: "Дополнительные страницы",
  [morePages.undergraduate]: "Бакалавриат",
  [morePages.master]: "Магистратура",
  [morePages.KCP]: "КЦП",
  [morePages.prices]: "Цены",
  [morePages.datesOfReceipt]: "Сроки поступления",
  [morePages.KCPMore]: "Допсправочники КЦП",
  [morePages.olympic]: "Олимпиады",
};

export const phoneRegExp = /(\+7|8)[- _]*\(?[- _]*(\d{3}[- _]*\)?([- _]*\d){7}|\d\d[- _]*\d\d[- _]*\)?([- _]*\d){6})/;
export const numberRegExp = /^\d*[.,]?\d*$/;
// /^\d+(?:[.,]\d?)$/;

// const isProd = process.env.REACT_APP_API_URL === "/api/";

export const MAX_FILE_SIZE = 5242880; //: 2097152;
export const MAX_FILE_MB = MAX_FILE_SIZE / 1024 / 1024;

export const defaultContentPages = {
  recovery: "/32",
};

export const IMAGE_RATIO_CONTACT = 10 / 10;
export const IMAGE_RATIO_BG = 28 / 10;
export const IMAGE_RATIO_PARTNER = 4 / 3;
export const IMAGE_RATIO_EMPLOYER = 1 / 1;

export const DEFAULT_PER_PAGE = 10;
export const DEFAULT_PER_PAGE_FAQ = 10;
export const BASE_PAGINATION_FAQ = `?perPage=${DEFAULT_PER_PAGE_FAQ}&page=1`;
export const BASE_PAGINATION = `?perPage=${DEFAULT_PER_PAGE}&page=1`;
export const BASE_SORT = "";
export const DEFAULT_PER_PAGE_SEARCH = 5;
export const BASE_PAGINATION_SEARCH = `?perPage=${DEFAULT_PER_PAGE_SEARCH}&page=1`;
export const PAGINATION_PER_PAGE_OPTIONS = [
  {
    key: 10,
    label: "10 на странице",
  },
  {
    key: 20,
    label: "20 на странице",
  },
  {
    key: 30,
    label: "30 на странице",
  },
  {
    key: 100,
    label: "100 на странице",
  },
];

export const programsPublishList = [
  { key: 1, label: "Да" },
  { key: 0, label: "Нет" },
];

export const statusProgram = [
  {
    label: "Архив",
    key: 0,
  },
  {
    label: "Рабочая",
    key: 1,
  },
  {
    label: "Проект программы",
    key: 2,
  },
];

export const DICTIONARY_TYPES = {
  FAQ: "FAQ",
  PAGE: "PAGE",
  CONTACT: "CONTACT",
  EDUCATION_PROGRAM: "EDUCATION_PROGRAM",
};
