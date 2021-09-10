export function FormatDate(date) {
  var format_date = new Date(date);

  return (
    format_date.getFullYear() +
    "-" +
    format_date.getMonth() +
    "-" +
    format_date.getDate() +
    " " +
    format_date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    })
  );
}
