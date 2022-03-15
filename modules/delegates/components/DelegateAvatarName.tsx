import { Delegate } from '../types';
import { Box, Flex, Text } from 'theme-ui';

import { limitString } from 'lib/string';
import { DelegatePicture } from 'modules/delegates/components';

import { useAccount } from 'modules/app/hooks/useAccount';
import { Address } from 'modules/address/components/Address';

export default function DelegateAvatarName({ delegate }: { delegate: Delegate }): React.ReactElement {
  const { account } = useAccount();
  const isOwner = account?.toLowerCase() === delegate.address.toLowerCase();

  return (
    <Flex>
      <DelegatePicture delegate={delegate} />

      <Box sx={{ ml: 2 }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text as="p" variant="microHeading" sx={{ fontSize: [3, 4] }}>
            {delegate.name
              ? limitString(delegate.name, isOwner ? 23 : 43, '...')
              : limitString('Unknown', isOwner ? 12 : 43, '...')}
          </Text>
          {isOwner && (
            <Flex
              sx={{
                display: 'inline-flex',
                backgroundColor: 'tagColorSevenBg',
                borderRadius: 'roundish',
                padding: '3px 6px',
                alignItems: 'center',
                color: 'tagColorSeven',
                ml: 2
              }}
            >
              <Text sx={{ fontSize: 1 }}>Owner</Text>
            </Flex>
          )}
        </Flex>
        <Address address={delegate.voteDelegateAddress} />
      </Box>
    </Flex>
  );
}
