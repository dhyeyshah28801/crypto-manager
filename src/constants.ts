class ConstantService {
  ADMIN = 1;
  USER = 2;

  ROLE_MAP = {
    "Admin": 1,
    "User": 2
  }

  USER_STATUS_MAP = {
    "Active": 1,
    "Inactive": 0
  }
  USER_STATUS_ACTIVE = 1;
  USER_STATUS_INACTIVE = 0;
  "DATE_FORMAT_ISO" = "YYYY-MM-DD";
  "DATE_FORMAT_UK" = "DD-MM-YYYY";
  "DATE_FORMAT_ISO_WITH_TIMEZONE" = "YYYY-MM-DDTHH:mm:ssZ";
  "DATE_FORMAT_WITH_MONTH_NAME" = "DD-MMM-YYYY HH:mm:ss";
  "UI_DATE_FORMAT" = "DD-MM-YYYY HH:mm:ss";

  TABLE_FOOTER_ITEMS_PER_PAGE_OPTIONS = [
    { value: 5, title: "5" },
    { value: 10, title: "10" },
    { value: 25, title: "25" },
    { value: 50, title: "50" },
  ];

  SEARCH_SEPARATOR = "/";
}

export default new ConstantService();
