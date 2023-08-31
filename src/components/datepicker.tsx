import React from "react";
import Datepicker, {registerLocale, setDefaultLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
registerLocale("ko", ko);
setDefaultLocale("ko");

type DatepickerType = {
	closeOnScroll: boolean,
	selected: Date,
	onChange: Function
}
function StyledDatepicker(info : DatepickerType) {

	const {closeOnScroll, selected, onChange} = info;

	return (
		<Datepicker
			locale="ko"
			dateFormat="yyyy-mm-dd"
			closeOnScroll={closeOnScroll}
			selected={selected}
			onChange={onChange()}
		/>
	)
}

export default StyledDatepicker;