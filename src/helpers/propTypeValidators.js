/**
 * Validate number between min and max.
 * @param {Number} min - Ubound value, inclusize.
 * @param {Number} max - Lbound value, inclusize.
 * @param {Boolean} [isRequired] - Optional.Check field is required.
 * @example
 * // validate number between 1 and 12
 * numberBetween(1,12)
 * @return{(Error|TypeError|String)} return Error or null
 */
const numberBetween = (min, max, isRequired = false) => {
  return (props, propName, componentName) => {
    const propValue = props[propName];
    if (isRequired) {
      if (propValue == null) {
        return new Error(`Prop ${propName} is required on ${componentName} `);
      }
    }
    if (propValue) {
      if (typeof propValue != "number") {
        return new TypeError(
          `Prop ${propName} must a number on ${componentName} `
        );
      }
      if (propValue < min || propValue > max) {
        return new Error(
          `Prop ${propName} value must be in ${min} and ${max} on ${componentName} `
        );
      }
    }
  };
};
const Validators = {
  numberBetween,
};
export default Validators;
