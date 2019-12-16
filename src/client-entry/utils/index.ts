import { TLong } from '@waves/waves-js/dist/src/interface';
import { TAssetDetails } from '@waves/blockchain-api/dist/cjs/api-node/assets';
import { WAVES } from '../../constants';
import { BigNumber } from '@waves/bignumber';

export const toArray = <T>(data: T | Array<T>): Array<T> =>
    Array.isArray(data) ? data : [data];

export function toFormat(
    data: TLong,
    id: string | null,
    hash: Record<string, TAssetDetails>
): string {
    const asset = id != null ? hash[id] : WAVES;

    if (asset == null) {
        throw new Error('Asset not found!');
    }

    return (
        BigNumber.toBigNumber(data)
            .div(Math.pow(10, asset.decimals))
            .roundTo(asset.decimals)
            .toFixed() + ` ${asset.name}`
    );
}
