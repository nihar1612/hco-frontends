export interface RangeParams {
  start: number;
  end: number;
  step?: number;
}

export function range({ start, end, step = 1 }: RangeParams): number[] {
  return Array.from(Array.from(Array(Math.ceil((end - start) / step)).keys()), (x) => start + x * step);
}
