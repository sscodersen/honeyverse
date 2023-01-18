import HandleRoomItemState from "./HandleRoomItemState";
import ServerMessage from "../protocol/ServerMessage";

const handleRoomItemState = new HandleRoomItemState();

const message = new ServerMessage();
message.appendInt(123); // item id
message.appendInt(1); // new state

handleRoomItemState.handle(message);