export function useApp() {
  const objectToDotNotation = (
    obj: Record<string, any>,
    prefix = ""
  ): Record<string, any> => {
    return Object.keys(obj).reduce((res, el) => {
      if (Array.isArray(obj[el])) {
        return {
          ...res,
          ...objectToDotNotation(obj[el], `${prefix}${el}.`),
        };
      } else if (typeof obj[el] === "object" && obj[el] !== null) {
        return {
          ...res,
          ...objectToDotNotation(obj[el], `${prefix}${el}.`),
        };
      } else {
        return {
          ...res,
          [`${prefix}${el}`]: obj[el],
        };
      }
    }, {});
  };

  const dotNotationToObject = (
    obj: Record<string, any>
  ): Record<string, any> => {
    const res: Record<string, any> = {};
    Object.keys(obj).forEach((key) => {
      const split = key.split(".");
      let current = res;
      for (let i = 0; i < split.length; i++) {
        if (i === split.length - 1) {
          current[split[i]] = obj[key];
        } else {
          current[split[i]] = current[split[i]] || {};
          current = current[split[i]];
        }
      }
    });
    return res;
  };

  return {
    objectToDotNotation,
    dotNotationToObject,
  };
}
