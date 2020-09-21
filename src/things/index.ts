import { FeatureMap } from "./feature";
import { ThingFeatures } from "./thing";

export class Thing<F extends keyof ThingFeatures = keyof ThingFeatures> {
    public parentId?: string;
    public disabled: boolean = false;
    public shape?: string;
    public layer: number = 0;
    
    constructor(
        public readonly id: string,
        public scheme: string,
        public readonly features: FeatureMap<{ [K in F]: ThingFeatures[K] }> = new FeatureMap()
    ) {}

    public static fromJSON(json: string): Thing[] {
        const structs = JSON.parse(json) as Array<{
            id: string,
            parent_id?: string,
            scheme: string
            disabled: boolean,
            shape: string,
            layer: number,
            // features: Partial<ThingFeatures>,
            features: string,
        }>;
        return structs.map(s => {
            const t = new Thing(s.id, s.scheme, new FeatureMap(JSON.parse(s.features) as Partial<ThingFeatures>))
            t.parentId = s.parent_id;
            t.shape = s.shape;
            return t;
        });
    }
}