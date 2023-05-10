import * as uuid from 'uuid';
import { DefaultOptionType } from 'antd/es/select';

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

    onOptionFilter(inputValue: string, path: DefaultOptionType[]): boolean {
        return path.some((option) => (option.label as string).toLowerCase().indexOf(inputValue.toLowerCase()) > -1,);
    }
}

const utils = new UtilsIndex();

export default utils;