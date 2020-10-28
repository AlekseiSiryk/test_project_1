const updatePrice = (textLength, lang, file) => {
    if (lang === '' || textLength === 0) return 0;
    const fileModifier = file === 'invalid' ? 1.2 : 1;
    const langCost = lang === 'en' ? 0.12 : 0.05;
    //const minCost = lang === 'en' ? 120 : 50;
    const minCost = 1000 * langCost * fileModifier;
    const price = textLength * langCost * fileModifier;
    return price > minCost ? Math.round(price * 100) / 100 : minCost;
}
const updateJobTime = (textLength, lang) => {
    if (lang === '' || textLength === 0) return '';
    const charsPerHour = lang === 'en' ? 333 : 1333;
    const currentTime = textLength / charsPerHour * 60 + 30;
    const timeToComplete = Math.round(currentTime);
    return timeToComplete > 60 ? timeToComplete : 60;
}

const deadline = (timeToComplete, startDate = new Date(), test='') => {
    if (timeToComplete === '') return '';
    const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;
    const getAnswer = (today = false) => {
        const jobEnd = new Date(startDate.getTime() + timeToComplete);
        let minutes = jobEnd.getMinutes();
        let hours = jobEnd.getHours();
        if (minutes === 0) minutes = '00';
        else if (minutes < 30) minutes = 30;
        else if (minutes > 30){ minutes = "00"; hours++};
        if (test === 'test') return jobEnd.toString();
        if (today) return `Виконаємо сьогодні до ${hours}:${minutes}`;
        return `Термін виконання: ${jobEnd.toLocaleDateString()} о ${hours}:${minutes}`;
    }
    timeToComplete *= 60 * 1000;
    const workingDayEnd = new Date (startDate);
    workingDayEnd.setHours(19);
    workingDayEnd.setMinutes(0);
    if (!isWeekend(startDate) && startDate.getHours() < 19){
        if (startDate.getHours() < 10) startDate.setHours(10) && startDate.setMinutes(0);
        if (startDate.getTime() + timeToComplete < workingDayEnd.getTime()){
            return getAnswer(true);
        }
        timeToComplete -= (workingDayEnd.getTime() - startDate.getTime());
    }
    startDate.setHours(10);
    startDate.setMinutes(0);
    do{
        startDate.setDate(startDate.getDate() + 1);
        workingDayEnd.setDate(workingDayEnd.getDate() + 1);
        if (isWeekend(startDate)) continue;
        if (startDate.getTime() + timeToComplete <= workingDayEnd.getTime()) {
            return getAnswer(false);
        }
        timeToComplete -= (workingDayEnd.getTime() - startDate.getTime());
    } while (timeToComplete > 0);
}
export {updatePrice, updateJobTime, deadline}