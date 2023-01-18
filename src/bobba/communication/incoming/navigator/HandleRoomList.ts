import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import { getRoomData } from "../roomdata/HandleRoomData";
import RoomData from "../../../navigator/RoomData";
import BobbaEnvironment from "../../../BobbaEnvironment";
import web3 from "../../../web3";
import RoomDataStorage from "../../../contracts/RoomDataStorage.json";

export default class HandleRoomList implements IIncomingEvent {
    handle(request: ServerMessage): void {
        const count = request.popInt();
        const roomDatas: RoomData[] = [];
        for (let i = 0; i < count; i++) {
            const data = getRoomData(request);
            roomDatas.push(data);

            // Add smart contract logic to store room data on the blockchain
            const contract = new web3.eth.Contract(RoomDataStorage.abi, data.contractAddress);
            contract.methods.storeRoomData(data.id, data.name, data.description, data.ownerId, data.maxUsers).send({ from: web3.eth.defaultAccount });
        }

        BobbaEnvironment.getGame().navigator.handleRoomDataList(roomDatas);
    }
}
