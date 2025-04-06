export const toPhoneNumber = (n: number) => {
    const phoneNumber = `${n}`;
    const areaCode = phoneNumber.substring(0, 3);
    const part1 = phoneNumber.substring(3, 6);
    const part2 = phoneNumber.substring(6, 10);

    return `(${areaCode}) ${part1}-${part2}`;
};