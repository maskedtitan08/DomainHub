import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

const Domain = ({ domain, contract, provider, id}) => {

    const [owner, setOwner] = useState(null);
    const [hasSold, setHasSold] = useState(false);
    const getOwner = async () => {
        if (domain.soldOut || hasSold) {
            const owner = await contract.ownerOf(id);
            setOwner(owner);
        }
    }

    const buyHandler = async () => {
        const signer = await provider.getSigner();
        const transaction = await contract.connect(signer).mintDomain(id, { value: domain.cost })
        await transaction.wait();
        setHasSold(true);
    }
    useEffect(() => {
        getOwner()
    }, [hasSold])
    return (
        <>
            <div className='card'>
                <div className='card__info'>
                    <h3>
                        {domain.soldOut || owner ? (
                            <del>{domain.name}</del>
                        ) : (
                            <>{domain.name}</>
                        )}

                    </h3>
                    <p>
                        {domain.soldOut || owner ? (
                            <>
                                <small>
                                    Owned by:<br />
                                    <span>
                                        {owner && `${owner.slice(0, 6)}...${owner.slice(-3)}`}
                                    </span>
                                </small>
                            </>
                        ) : (
                            <>
                                <strong>{ethers.formatEther(domain.cost.toString(), 'ether')}</strong>
                                ETH
                            </>
                        )}

                    </p>
                </div>
                {!domain.soldOut && !owner && (
                    <button type='button' className='card__button' onClick={() => buyHandler()}>Buy</button>
                )}
            </div>
        </>
    )
}

export default Domain;