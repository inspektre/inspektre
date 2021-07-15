export type Log = {
  time: number,
  message: string,
  type: string
  verbose?: Boolean,
  authenticated?: Boolean | null,
  user?: string | null
};