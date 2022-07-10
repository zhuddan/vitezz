export type Within = `within_${string}`;

export type WholeHours = string;
export type Between = `${string}_${string}`;

type values = Array<Within | WholeHours | Between>;

const data1: Within = 'within_2';
const data2: WholeHours = '2';
const data3: Between = '1_1';
export const data: values = [data1, data2, data3];
export class Time {}
