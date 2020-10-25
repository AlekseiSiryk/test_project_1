const {updatePrice, updateJobTime, deadline} = require('./logic')
test("Test for calculating price", () =>{
    expect(updatePrice(1000,'ru', 'valid')).toBe(50);
    expect(updatePrice(2000,'ru', 'invalid')).toBe(120);
    expect(updatePrice(10,'ua', 'invalid')).toBe(60);
    expect(updatePrice(3000,'ua', 'invalid')).toBe(180);
    expect(updatePrice(5555,'ua', 'text')).toBe(277.75);
    expect(updatePrice(1,'en', 'valid')).toBe(120);
    expect(updatePrice(2000,'en', 'text')).toBe(240);
    expect(updatePrice(1000,'en', 'invalid')).toBe(144);
    expect(updatePrice(999,'en', 'invalid')).toBe(144);
});
test("Test for calculating time for job", () =>{
    expect(updateJobTime(1333,'ru')).toBe(90);
    expect(updateJobTime(10,'ua')).toBe(60);
    expect(updateJobTime(3999,'ua')).toBe(210);
    expect(updateJobTime(1,'en')).toBe(60);
    expect(updateJobTime(100,'en')).toBe(60);
    expect(updateJobTime(999,'en')).toBe(210);
    expect(updateJobTime(1558440,'en')).toBe(280830);
});

test("Test for calculating deadline", () =>{
    expect(deadline(60, new Date("Sat Oct 24 2020 17:00:00"))).toBe("Термін виконання: 26.10.2020 о 11:00");
    expect(deadline(300, new Date("Sat Oct 24 2020 22:00:00"))).toBe("Термін виконання: 26.10.2020 о 15:00");
    expect(deadline(60, new Date("Tue Oct 27 2020 17:25:08"))).toBe("Виконаємо сьогодні до 18:30");
    expect(deadline(120, new Date("Wed Oct 28 2020 04:25:08"))).toBe("Виконаємо сьогодні до 12:00");
    expect(deadline(180, new Date("Fri Oct 30 2020 18:00:00"))).toBe("Термін виконання: 02.11.2020 о 12:00");
    expect(deadline(5 * 9 * 60, new Date("Mon Oct 26 2020 11:01:00"))).toBe("Термін виконання: 02.11.2020 о 11:30");
    expect(deadline(280800, new Date("Fri Oct 23 2020 20:00:00"))).toBe("Термін виконання: 21.10.2022 о 19:00");
});
