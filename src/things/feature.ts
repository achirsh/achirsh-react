export class FeatureMap<F extends { [k: string]: any }> {
    constructor(
        private features: Partial<F> = {}
    ){}
        
    public has<K extends keyof F>(key: K): boolean {
        if (typeof this.features === 'string') {
            return JSON.parse(this.features)[key] !== undefined
        }
        return this.features[key] !== undefined
    }

    public del<K extends keyof F>(key: K): boolean {
        return this.has(key) ? delete this.features[key] : false;
    }

    public get<K extends keyof F>(key: K): F[K] | undefined;
    public get<K extends keyof F>(key: K, value: F[K]): F[K];
    public get<K extends keyof F>(key: K, value?: F[K]): F[K] | undefined {
        return this.has(key) ? (typeof this.features === "string" ? JSON.parse(this.features)[key] : this.features[key]) : value;
    }

    public set<K extends keyof F>(key: K, value: F[K]): void {
        this.features[key] = value;
    }
}