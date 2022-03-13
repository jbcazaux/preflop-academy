export default (v1:number, v2: number) => {
    if (v1 === v2) return 0
    if (v1 === 0) return 1
    if (v2 === 0) return -1
    return v1 - v2
}