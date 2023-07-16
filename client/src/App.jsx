import { useState,useEffect } from 'react'
import {ethers} from 'ethers';
import Navigation from "./components/Navigation"
import Search from "./components/Search"
import Domain from "./components/Domain"
import './App.css'

function App() {
  const[account,setAccount] = useState("");
  const [provider, setProvider]=useState(null);
  const[contract,setContract]=useState(null);
  const[domains,setDomains] = useState([]);

  useEffect(()=>{
    if(contract )
    loadBlockchainData(contract);
  },[contract]);
  const loadBlockchainData = async(contract) =>{

    const maxSupply = await contract.id();
    for(var i=0;i<maxSupply;i++){
      const domain = await contract.getDomain(i);
      domains.push(domain);
    }

    setDomains(domains);

  }

  return (
    <>  
      <Navigation account={account} setAccount={setAccount} setProvider={setProvider} setContract={setContract}/>
      <Search />
      <div className='cards__section'>
        <h2 className='cards__title'>Some top domain name !</h2>
        <p className='cards__description'>
          Own your custom username and use it across services
        </p>
        <hr /> 
        <div className='cards'>
          {domains && domains.map((domain,index) => (
            <Domain domain={domain} contract={contract} provider={provider} id={index}  key={index} />
          ))}
        </div>
      </div>
      
    </>
  )
}

export default App
