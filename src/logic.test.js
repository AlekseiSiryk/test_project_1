import moment from "moment";
const {updatePrice, updateJobTime, deadline} = require('./logic')
/*test.each`
textLength | lang   | file           | startDate                     | price       | jobEnd
${1000}    | ${'ru'}  | ${'text'}    | ${"Sat Oct 24 2020 17:00:00"} | ${50}       | ${"Термін виконання: 26.10.2020 о 11:30"}
${2000}    | ${'ua'}  | ${'invalid'} | ${"Mon Oct 26 2020 9:20:00"}  | ${120}      | ${"Виконаємо сьогодні до 12:00"}
${10}      | ${'ru'}  | ${'valid'}   | ${"Fri Oct 23 2020 18:28:00"} | ${50}       | ${"Термін виконання: 26.10.2020 о 10:30"}
${10}      | ${'en'}  | ${'invalid'} | ${"Mon Oct 26 2020 17:00:00"} | ${144}      | ${"Виконаємо сьогодні до 18:00"}
${8000}    | ${'en'}  | ${'valid'}   | ${"Tue Oct 27 2020 15:00:00"} | ${960}      | ${"Термін виконання: 30.10.2020 о 13:00"}    
${1558273} | ${'en'}  | ${'text'}    | ${"Fri Oct 23 2020 20:00:00"} | ${186992.76}| ${"Термін виконання: 21.10.2022 о 19:00"}        
`('$textLength $lang $file $startDate $price $jobEnd', ({textLength, lang, file, startDate, price, jobEnd}) => {
    expect(updatePrice(textLength, lang, file)).toBe(price);
    expect(deadline(updateJobTime(textLength, lang), new Date(startDate))).toBe(jobEnd);
});*/
test.each`
startTime                        | durationHours | expectedResult
${'23/09/2019, 10:00 Monday'}    | ${5}          | ${'23/09/2019, 15:00 Monday'}
${'23/09/2019, 18:00 Monday'}    | ${7}          | ${'24/09/2019, 16:00 Tuesday'}
${'23/09/2019, 18:00 Monday'}    | ${25}         | ${'26/09/2019, 16:00 Thursday'}
${'21/09/2019, 15:00 Saturday'}  | ${7}          | ${'23/09/2019, 17:00 Monday'}
${'20/09/2019, 17:00 Friday'}    | ${60}         | ${'01/10/2019, 14:00 Tuesday'}
${'21/09/2019, 17:00 Saturday'}  | ${60}         | ${'01/10/2019, 16:00 Tuesday'}
${'24/09/2019, 08:00 Tuesday'}   | ${8}          | ${'24/09/2019, 18:00 Tuesday'}
${'25/09/2019, 08:00 Wednesday'} | ${8}          | ${'25/09/2019, 18:00 Wednesday'}
${'25/09/2019, 18:00 Wednesday'} | ${8}          | ${'26/09/2019, 17:00 Thursday'}
${'25/09/2019, 19:00 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
${'25/09/2019, 18:45 Wednesday'} | ${8}          | ${'26/09/2019, 17:45 Thursday'}
${'25/09/2019, 19:10 Wednesday'} | ${8}          | ${'26/09/2019, 18:00 Thursday'}
${'27/09/2019, 17:00 Friday'}    | ${8}          | ${'30/09/2019, 16:00 Monday'}
${'27/09/2019, 19:00 Friday'}    | ${8}          | ${'30/09/2019, 18:00 Monday'}
${'28/09/2019, 10:00 Saturday'}  | ${8}          | ${'30/09/2019, 18:00 Monday'}
`('$startTime $durationHours $expectedResult', ({startTime, durationHours, expectedResult}) => {
    const startDate = new Date(moment(startTime, `DD-MM-YYYY hh:mm`).toDate());
    const jobEnd = new Date(moment(expectedResult, `DD-MM-YYYY hh:mm`).toDate()).toString();
    expect(deadline(durationHours*60, startDate, 'test')).toBe(jobEnd);
});