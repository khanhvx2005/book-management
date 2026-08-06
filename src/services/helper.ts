import moment from "moment";
export const FORMATE_DATE = "YYYY-MM-DD";
export const dateRangeValidate = (dateRange: any) => {
  if (!dateRange) return;
  const startDate = moment(dateRange[0], FORMATE_DATE).startOf('day').toDate();


  const endDate = moment(dateRange[1], 'YYYY-MM-DD').endOf('day').toDate();
  return [startDate, endDate]
}

