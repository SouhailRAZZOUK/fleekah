export function* oneTime() {
    yield 1;
};

export const once = oneTime();