type IsUnion<T, S = T> = T extends T ? ([S] extends [T] ? false : true) : never;

export const stageSwitcher = <S extends keyof any, C extends Record<S, any>>(
    stage: S,
    dict: IsUnion<C[keyof C]> extends true ? never : C
): C extends Record<S, infer R> ? R : never => {
    return dict[stage];
};
