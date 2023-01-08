import { MaxiType, MiniType } from "../misc/enums";

export default class Challenge {
    type: MiniType | MaxiType;
    description: string;
    
    constructor(type: MiniType | MaxiType, description: string) {
        this.type = type;
        this.description = description;
    }
}
