export class DateUtility {
    constructor() {}

    getDateInFormat(inputDate: any, format: string = 'yyyy/dd/mm'): string {
        try {
            const newDate = new Date(inputDate);
            const year = (newDate.getFullYear()).toString();
            let month: number | string = newDate.getMonth();
            month = ((month+1).toString()).length > 1 ? (month+1).toString() : "0"+((month+1).toString());

            let day: number | string = newDate.getDate();
            day = (day.toString()).length > 1 ? day.toString() : "0"+(day.toString());

            if(year !== 'NaN' && month !== 'NaN' && day !== 'NaN') {
                if(format === 'yyyy/dd/mm') {
                    return year+'/'+month+'/'+day;
                }
            }
        } catch(e) {}
        return 'Invalid Date';
    }
}