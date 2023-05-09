import * as uuid from 'uuid';

class UtilsIndex {
    generateElementKey(str = "") {
        return `${uuid.v4()}_${str}`;
    }

    getEnumObjectByValue<T extends { [index: string]: string | number }>(enumType: T, value: string | number): T[keyof T] | undefined {
        for (const key in enumType) {
            if (enumType[key] === value) {
                return enumType[key as keyof T];
            }
        }
        return undefined;
    }
}

const utils = new UtilsIndex();

export default utils;