// https://bobbyhadz.com/blog/typescript-make-single-property-optional

export type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
    Partial<Pick<Type, Key>>
