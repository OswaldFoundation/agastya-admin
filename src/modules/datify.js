import moment from "moment";
export default date => {
	const stillUtc = moment.utc(date).toDate();
	const local = moment(stillUtc)
		.local()
		.format("YYYY-MM-DD HH:mm:ss");
	return {
		text: local,
		fromNow: moment(local).fromNow()
	};
};
