class DataTransformer {
    static toCamelCase(data) {
        if (typeof data !== 'object' || data === null) return data;

        if (Array.isArray(data)) {
            return data.map(v => this.toCamelCase(v));
        }

        return Object.keys(data).reduce((acc, key) => {
            const newKey = key.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
            acc[newKey] = this.toCamelCase(data[key]);
            return acc;
        }, {});
    }

    static toSnakeCase(data) {
        if (typeof data !== 'object' || data === null) return data;

        if (Array.isArray(data)) {
            return data.map(v => this.toSnakeCase(v));
        }

        return Object.keys(data).reduce((acc, key) => {
            const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            acc[newKey] = this.toSnakeCase(data[key]);
            return acc;
        }, {});
    }
}

module.exports = DataTransformer;
