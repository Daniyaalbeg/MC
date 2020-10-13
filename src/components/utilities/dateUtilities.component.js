export function formatDate(date, display, seperator='/') {
  var d = new Date(date),
  day = '' + d.getDate(),
      month = '' + d.getMonth(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

    if (display && isToday(d)) {
        return `${d.getHours()}:${checkZero(d.getMinutes())}`
    } else if (display && isThisYear(d)) {
        return `${d.toLocaleString('default', { month: 'short' })} ${checkZero(d.getDate())}`
    }
  return [year, month, day].join(seperator);
}

const checkZero = (num) => {
    if (num.length < 2) {
        num = '0' + num
    }
    return num
}

const isThisYear = (date) => {
    const thisYear = new Date()
    return thisYear.getYear() === date.getYear()
}

const isToday = (date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};