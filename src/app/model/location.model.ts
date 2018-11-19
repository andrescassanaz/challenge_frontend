
import {WeatherPointModel} from "./weatherpoint.model";

export class LocationModel{
    public woeid: String;
    public city: String;
    public country: String;
    public boardId: String;
    public weatherPoints: WeatherPointModel[];
}
