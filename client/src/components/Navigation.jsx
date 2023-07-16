import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import DomainHub from "../artifacts/contracts/DomainHub.sol/DomainHub.json"
import logo from '../assets/logo.svg'

const Navigation = ({ account, setAccount,setProvider,setContract}) => {
    const[connected,setConnected] = useState(true);
    const loadWeb3 = async () => {
        let signer = null;
        if (window.ethereum == null) {
            console.log("No Metamask detected");
            const provider = ethers.getDefaultProvider();
            setProvider(provider);
        }
        else {
            const provider = new ethers.BrowserProvider(window.ethereum);
            console.log(provider);
            setProvider(provider);
            window.ethereum.on("chainChanged", () => {           
                window.location.reload();
            });                                                     

            window.ethereum.on("accountsChanged", () => {        
                window.location.reload();
            });

            const chainId = 1442;
            const network = await provider.getNetwork();
            if(network.chainId==chainId){
            signer = await provider.getSigner();
            const account = await signer.getAddress();
            setAccount(account);
            setConnected(false);
            const contractAddress = "0xBAA67414B9FB3da9A1EACA928a55Ebbdbb24771b";
            const contract = new ethers.Contract(contractAddress, DomainHub.abi, signer);
            
            setContract(contract);
            console.log(contract);
            }
            else{
                alert('Please connect to zkevm Testnet');
            }
        }
    };

    return (
        <nav>
            <div className='nav__brand'>
                <img src={logo} alt="Logo" />
                <h1>Domain Hub</h1>
                <ul className='nav__links'>
                    <li><a href="#">Domain Names</a></li>
                    <li><a href="#">Websites & Hosting</a></li>
                    <li><a href="#">Commerce</a></li>
                    <li><a href="#">Email & Marketing</a></li>
                </ul>
            </div>
            <button type='button' className='nav__connect' onClick={loadWeb3}>
                {connected ? "Connect" : account.length === 42 ? `${account.slice(0, 6)}...${account.slice(-3)}` : account}
                {/* {account.length === 42 ? `${account.slice(0, 6)}...${account.slice(-3)}` : account} */}
            </button>
        </nav>
    )
}

export default Navigation