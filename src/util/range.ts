export default function* range(start: number, end: number, step: number = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}
