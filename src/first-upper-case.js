export const firstUpperCase = word => `${word[0].toUpperCase()}${[...word].splice(1).join('')}`