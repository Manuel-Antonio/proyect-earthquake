import { Attribute } from "./attribute.model";
import { Link } from "./link.model";

export interface Feature {
    id: string;
    type: string;
    attributes: Attribute;
    links: Link;
}