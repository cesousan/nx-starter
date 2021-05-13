// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSXify<T extends Element> = Partial<Omit<T, 'children'> & { childre?: any[] | any }>
