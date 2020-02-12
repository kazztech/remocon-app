import { grey, red, green, yellow, blue } from "@material-ui/core/colors";

const buttonColor = (color: string) => {
  switch (color) {
    case "black":
      return grey;
    case "red":
      return red;
    case "green":
      return green;
    case "yellow":
      return yellow;
    case "blue":
      return blue;
    default:
      return grey;
  }
};

export default buttonColor;
