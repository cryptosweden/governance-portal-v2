import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector, WalletConnectConnectorArguments } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { networkToRpc } from '../helpers';
import { CHAIN_INFO, NodeProviders, SupportedNetworks } from '../web3.constants';

const POLLING_INTERVAL = 12000;

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    CHAIN_INFO[SupportedNetworks.MAINNET].chainId,
    CHAIN_INFO[SupportedNetworks.GOERLI].chainId,
    CHAIN_INFO[SupportedNetworks.KOVAN].chainId,
    CHAIN_INFO[SupportedNetworks.TESTNET].chainId
  ]
});

export const walletConnectConnector = new WalletConnectConnector({
  rpc: { 1: networkToRpc(SupportedNetworks.MAINNET, NodeProviders.INFURA) },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL
} as WalletConnectConnectorArguments);

export const walletLinkConnector = new WalletLinkConnector({
  url: networkToRpc(SupportedNetworks.MAINNET, 'infura'),
  appName: 'vote.makerdao.com'
});