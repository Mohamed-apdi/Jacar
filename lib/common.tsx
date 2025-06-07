import { Dimensions } from "react-native";


const {width, height} = Dimensions.get('window');

interface Percentage {
    (percentage: number): number;
}

export const hp: Percentage = (percentage) => {
    return (percentage * height) / 100;
}

export const wp: Percentage = (percentage) => {
    return (percentage * width) / 100;
}
