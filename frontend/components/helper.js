export const getSizeValue = (size) => {
  switch (size) {
    case "S":
      return "small";
    case "M":
      return "medium";
    case "L":
      return "large";
    case "XL":
      return "x_large";
    case "XXL":
      return "xx_large";
    case "XXXL":
      return "xxx_large";
    case "XXXXL":
      return "xxxx_large";
    default:
      return "xxxxx_large";
  }
};
