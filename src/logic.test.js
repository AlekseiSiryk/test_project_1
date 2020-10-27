const {updatePrice, updateJobTime, deadline} = require('./logic')
test.each`
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
});
