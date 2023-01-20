import Web3 from 'web3';
import CatalogueContract from './contracts/Catalogue.json';
import RequestCatalogueIndex from './RequestCatalogueIndex';
import Connection from './Connection';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(CatalogueContract.abi, '0x...'); // replace with the address of your deployed contract
const account = '0x...'; // replace with the address of the user making the request

const connection = new Connection('ws://localhost:3001');
connection.connect();

const request = new RequestCatalogueIndex();
connection.send(request);

contract.methods.getCatalogueIndex().call({ from: account }, (error, result) => {
    console.log(result);
});