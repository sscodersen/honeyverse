import ClientMessage from "../../protocol/ClientMessage";
import { REQUEST_CATALOGUE_PURCHASE } from "../../protocol/OpCodes/ClientOpCodes";
import Web3 from 'web3';
import CatalogueContract from './contracts/Catalogue.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(CatalogueContract.abi, '0x...'); // replace with the address of your deployed contract

export default class RequestCataloguePurchase extends ClientMessage {
    constructor(pageId: number, itemId: number) {
        super(REQUEST_CATALOGUE_PURCHASE);
        this.appendInt(pageId);
        this.appendInt(itemId);
    }

    async buyItem() {
        try {
            const accounts = await web3.eth.getAccounts();
            const itemPrice = await contract.methods.getItemPrice(this.pageId, this.itemId).call();
            const transaction = await contract.methods.buyItem(this.pageId, this.itemId).send({ from: accounts[0], value: itemPrice });
            console.log(transaction);
        } catch (err) {
            console.error(err);
        }
    }
}
