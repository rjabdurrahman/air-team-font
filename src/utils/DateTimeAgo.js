import ReactTimeAgo from "react-time-ago";
export function DateTimeAgo(date) {
  return <ReactTimeAgo date={date} locale="en-US" />;
}
