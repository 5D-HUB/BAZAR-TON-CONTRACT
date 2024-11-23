import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { BazarJetton } from '../wrappers/BazarJetton';
import '@ton/test-utils';

describe('BazarJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let bazarJetton: SandboxContract<BazarJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        bazarJetton = blockchain.openContract(await BazarJetton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await bazarJetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: bazarJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and bazarJetton are ready to use
    });
});