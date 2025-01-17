import Link from 'next/link';
import { Button, Text, Flex, Badge, Box, Link as ThemeUILink } from 'theme-ui';
import Skeleton from 'modules/app/components/SkeletonThemed';
import Stack from 'modules/app/components/layout/layouts/Stack';
import { CMSProposal } from 'modules/executive/types';
import { ZERO_ADDRESS } from 'modules/web3/constants/addresses';
import { useMkrSupport } from 'modules/web3/hooks/useMkrSupport';
import { formatValue } from 'lib/string';

type Props = {
  proposal: CMSProposal;
  isHat: boolean;
};

export default function ExecutiveCard({ proposal, isHat, ...props }: Props): JSX.Element {
  const { data: mkrSupport } = useMkrSupport(proposal.address);
  return (
    <Stack gap={1} sx={{ variant: 'cards.primary' }} {...props}>
      <div>
        <Link
          href={{
            pathname: '/executive/[proposal-id]'
          }}
          as={{
            pathname: `/executive/${proposal.key}`
          }}
        >
          <ThemeUILink href={`/executive/${proposal.key}`} variant="nostyle" title="View Executive Details">
            <Text
              variant="microHeading"
              sx={{
                fontSize: [3, 4],
                cursor: 'pointer'
              }}
            >
              {proposal.title}
            </Text>
          </ThemeUILink>
        </Link>
      </div>
      <Box>
        <Text
          sx={
            {
              textOverflow: 'ellipsis',
              fontSize: [2, 3],
              opacity: 0.8,
              mb: [1, 3],
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2
            } as any
          }
        >
          {proposal.proposalBlurb}
        </Text>
      </Box>
      <Flex sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Link
          href={{
            pathname: '/executive/[proposal-id]'
          }}
          as={{
            pathname: `/executive/${proposal.key}`
          }}
        >
          <Button
            variant="primaryOutline"
            sx={{ borderRadius: 'small', px: 4, mr: 3, display: ['none', 'block'] }}
          >
            View proposal
          </Button>
        </Link>
        {isHat && proposal.address !== ZERO_ADDRESS ? (
          <Badge
            variant="primary"
            sx={{
              my: [1, 2],
              mr: 3,
              borderColor: 'primaryAlt',
              color: 'primaryAlt',
              textTransform: 'uppercase'
            }}
          >
            Governing proposal
          </Badge>
        ) : null}
        {mkrSupport ? (
          <Badge
            variant="primary"
            sx={{
              my: [1, 2],
              mr: 3,
              textTransform: 'uppercase'
            }}
          >
            {formatValue(mkrSupport)} MKR Supporting
          </Badge>
        ) : (
          <Box m="auto" sx={{ m: 2, width: '200px' }}>
            <Skeleton />
          </Box>
        )}
        <Link
          href={{
            pathname: '/executive/[proposal-id]'
          }}
          as={{
            pathname: `/executive/${proposal.key}`
          }}
        >
          <ThemeUILink href={`/executive/${proposal.key}`} variant="nostyle">
            <Button
              variant="primaryOutline"
              sx={{ borderRadius: 'small', px: 4, mt: 2, width: '100%', display: ['block', 'none'] }}
              title="View Executive Details"
            >
              View proposal
            </Button>
          </ThemeUILink>
        </Link>
      </Flex>
    </Stack>
  );
}
