export type CustomGeneratorRun = (generator: any, input: any) => any
export type CustomGenerator = { library: any; run: CustomGeneratorRun }
export type Generators = {
    [key: string]: CustomGenerator
}
