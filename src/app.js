export function useApp() {
  function objectToDotNotation(obj, prefix = "", result = {}) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          typeof value === "object" &&
          !Array.isArray(value) &&
          value !== null
        ) {
          objectToDotNotation(value, newKey, result);
        } else {
          result[newKey] = value;
        }
      }
    }

    return result;
  }

  function dotNotationToObject(obj, result = {}) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const keys = key.split(".");
        const lastKey = keys.pop();
        let currentObj = result;

        for (const nestedKey of keys) {
          if (!currentObj.hasOwnProperty(nestedKey)) {
            currentObj[nestedKey] = {};
          }
          currentObj = currentObj[nestedKey];
        }

        currentObj[lastKey] = value;
      }
    }

    return result;
  }

  return {
    objectToDotNotation,
    dotNotationToObject,
  };
}
