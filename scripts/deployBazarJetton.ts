import { Address, toNano } from '@ton/core';
import { BazarJetton } from '../wrappers/BazarJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "5DHub-Bazar",
        description: "5DHub Bazar jetton for Bazar application in Telegram market",
        symbol: "5DBAa",
        image: "https://static.tildacdn.net/tild3038-6637-4832-b530-643933356137/5dh_logo_b.png",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const bazarJetton = provider.open(await BazarJetton.fromInit(provider.sender().address as Address, content, 1000000000000000000n));

    await bazarJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 100000000000000000n,
            receiver: provider.sender().address as Address
        }
    );

    await provider.waitForDeploy(bazarJetton.address);

    // run methods on `bazarJetton`
}