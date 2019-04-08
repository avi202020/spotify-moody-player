import red from "@material-ui/core/colors/red";
import deepOrange from "@material-ui/core/colors/deepOrange";
import orange from "@material-ui/core/colors/orange";
import amber from "@material-ui/core/colors/amber";
import yellow from "@material-ui/core/colors/yellow";
import lime from "@material-ui/core/colors/lime";
import lightGreen from "@material-ui/core/colors/lightGreen";
import green from "@material-ui/core/colors/green";
import teal from "@material-ui/core/colors/teal";
import cyan from "@material-ui/core/colors/cyan";
import lightBlue from "@material-ui/core/colors/lightBlue";
import blue from "@material-ui/core/colors/blue";
import indigo from "@material-ui/core/colors/indigo";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { createMuiTheme } from "@material-ui/core/styles";
//Shade text is the last shade where the text is dark
//a higher shade means that the background color is dark enough for the text to change to a light color
const colorRed = {
  color: red,
  shadeText: 300
};
const colorDeepOrange = {
  color: deepOrange,
  shadeText: 400
};
const colorOrange = {
  color: orange,
  shadeText: 700
};
const colorAmber = {
  color: amber,
  shadeText: 900
};
const colorYellow = {
  color: yellow,
  shadeText: 900
};
const colorLime = {
  color: lime,
  shadeText: 800
};
const colorLightGreen = {
  color: lightGreen,
  shadeText: 600
};
const colorGreen = {
  color: green,
  shadeText: 500
};
const colorTeal = {
  color: teal,
  shadeText: 300
};
const colorCyan = {
  color: cyan,
  shadeText: 600
};
const colorLightBlue = {
  color: lightBlue,
  shadeText: 500
};
const colorBlue = {
  color: blue,
  shadeText: 400
};
const colorIndigo = {
  color: indigo,
  shadeText: 200
};
const colorDeepPurple = {
  color: deepPurple,
  shadeText: 200
};

const colors = [
  colorRed,
  colorDeepOrange,
  colorOrange,
  colorAmber,
  colorYellow,
  colorLime,
  colorLightGreen,
  colorGreen,
  colorTeal,
  colorCyan,
  colorLightBlue,
  colorBlue,
  colorIndigo,
  colorDeepPurple
];

//It returns an integer [0,13] representing a color according to song's energy
//y=13x
const energyToColor = energy => Math.round(13 * energy);

//It returns a shade [100,200,300...,900] representing the color intensity according to how positive a song is
//y=800*x+100
const valenceToShade = valence => Math.round((800 * valence + 100) / 100) * 100;

//This function is not used anymore
//Left here because it makes sense in the context of the project and it's easy
//to understand what it does in case it's needed for another project.
export const createDynamicTheme = (energy, valence) => {
  const colorIndex = energyToColor(energy);
  const colorShade = valenceToShade(valence);
  const dynamicColor = colors[colorIndex].color[colorShade];
  const dynamicTheme = createMuiTheme({
    palette: {
      primary: {
        main: dynamicColor
      },
      secondary: {
        main: dynamicColor
      },
      background: {
        paper:
          colors[colorIndex].shadeText <= colorShade ? "#ffffff" : "#424242"
      },
      text: {
        primary:
          colors[colorIndex].shadeText <= colorShade ? "#424242" : "#ffffff"
      }
    },
    typography: { useNextVariants: true }
  });
  return dynamicTheme;
};

export const colorShade = (energy, valence) => {
  const colorIndex = energyToColor(energy);
  const colorShade = valenceToShade(valence);
  return colors[colorIndex].color[colorShade];
};

//This function is used to determine if the background is dark enough to switch to a light color font
export const isTextDark = (energy, valence) => {
  const colorIndex = energyToColor(energy);
  const colorShade = valenceToShade(valence);
  return colors[colorIndex].shadeText >= colorShade ? true : false;
};

export const hexToRGBA = (hex, alpha) => {
  const hexs = hex.replace("#", "");
  const r = parseInt(hexs.substring(0, 2), 16);
  const g = parseInt(hexs.substring(2, 4), 16);
  const b = parseInt(hexs.substring(4, 6), 16);
  return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
};

export const rgb2rgba = (color, alpha) => {
  let rgbstringtrimmed = color.slice(0, -1);
  rgbstringtrimmed = rgbstringtrimmed.replace("rgb", "rgba");
  return rgbstringtrimmed + `, ${alpha})`;
};
