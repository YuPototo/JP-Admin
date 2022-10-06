export const calcSize = (size: number) => {
    return size < 1000000
        ? `${Math.floor(size / 1000)} KB`
        : `${Math.floor(size / 1000000)} MB`
}
