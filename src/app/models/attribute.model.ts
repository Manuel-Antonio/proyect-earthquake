import { Comment } from "./comment.model";
import { Coordinate } from "./coordinate.model";

export interface Attribute {
    externalId?: string;
    magnitude: number;
    place: string;
    time: string;
    tsunami: boolean;
    magType?: string;
    title: string;
    coordinates: Coordinate;
    comments: Comment[];
}
