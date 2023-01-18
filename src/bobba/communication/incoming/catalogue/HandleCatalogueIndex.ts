import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import { CatalogueIndex } from "../../../catalogue/Catalogue";
import CatalogueItem from "./CatalogueItem";

export default class HandleCatalogueIndex implements IIncomingEvent {
    handle(request: ServerMessage) {
        const mainTreeSize = request.popInt();
        const pages: CatalogueIndex[] = [];
        for (let i = 0; i < mainTreeSize; i++) {
            pages.push(this.extractPage(request));
        }

        const contractAddress = request.popString();
        BobbaEnvironment.getGame().catalogue.setIndex(pages, contractAddress);
    }

    extractPage(request: ServerMessage): CatalogueIndex {
        const visible = request.popBoolean();
        const color = request.popInt();
        const iconId = request.popInt();
        const id = request.popInt();
        const name = request.popString();
        const childrenCount = request.popInt();
        const children: CatalogueIndex[] = [];
        const items: CatalogueItem[] = [];

        for (let i = 0; i < childrenCount; i++) {
            children.push(this.extractPage(request));
        }

        const itemCount = request.popInt();for (let i = 0; i < itemCount; i++) {
            const itemId = request.popInt();
            const itemName = request.popString();
            const cost = request.popInt();
            const itemType = request.popInt();
            const baseId = request.popInt();
            const amount = request.popInt();items.push(new CatalogueItem(itemId, itemName, cost, itemType, baseId, amount));
        }

        return {
            id,
            name,
            iconId,
            color,
            visible,
            children,
            items
        }
    }
}
