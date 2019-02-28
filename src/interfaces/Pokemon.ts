import { Attack } from './Attack';

export interface Pokemon {
    id?: string;
    name?: string;
    number?: string;
    maxHP?: number;
    maxCP?: number;
    attacks?: { fast?: Attack[], special?: Attack[] };
}
