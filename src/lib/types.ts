export type CustomGeneratorRun = (generator: any, input: any) => any
export type CustomGenerator = {
    library: any
    run: CustomGeneratorRun | undefined
}
export type Generators = {
    [key: string]: CustomGenerator
}
