import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import RoomModel from "../../../rooms/RoomModel";
import Web3 from "web3";
import abi from "path/to/compiled/contract/abi";

const provider = new Web3.providers.HttpProvider("http://localhost:8545");
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(abi, "contractAddress");

export default class HandleHeightMap implements IIncomingEvent {
    handle(request: ServerMessage) {
        const cols = request.popInt();
        const rows = request.popInt();
        const doorX = request.popInt();
        const doorY = request.popInt();

        const heightmap: number[][] = [];

        for (let i = 0; i < cols; i++) {
            heightmap.push([]);
            for (let j = 0; j < rows; j++) {
                heightmap[i].push(request.popInt());
            }
        }

        const model = new RoomModel(cols, rows, doorX, doorY, heightmap);
        BobbaEnvironment.getGame().handleHeightMap(model);
        contract.methods.storeHeightMap(model.id, heightmap).send({from: "0x..."}); // replace with user's address
    }
}
