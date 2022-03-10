import { Box, Flex, Text, Link as ThemeUILink, Heading } from 'theme-ui';
import { Proposal, SpellData, SpellDiff as SpellDiffType } from '../types';
import { useEffect, useState } from 'react';
import { Icon as DaiUIIcon } from '@makerdao/dai-ui-icons';

import Stack from 'modules/app/components/layout/layouts/Stack';
import SkeletonThemed from 'modules/app/components/SkeletonThemed';
import { formatDateWithoutTime } from 'lib/datetime';
import { formatLocation, formatValue } from '../helpers/spellDiffParsers';
// import { formatLocation, formatValue } from '../helpers/spellDiffParsers';

// import { SpellDiff as SpellDiffType } from '../../../pages/executive/[proposal-id]';

const CircleIcon = ({ name }) => (
  <Flex
    mr={2}
    sx={theme => ({
      background: theme.colors?.background,
      borderRadius: '100%',
      width: '34px',
      minWidth: '34px',
      height: '34px',
      alignItems: 'center',
      justifyContent: 'center'
    })}
  >
    <DaiUIIcon name={name} size={3} color="primary" />
  </Flex>
);

const SpellDiff = ({ diffs }) => {
  return diffs.map((diff, i) => {
    const { contract, location, fromVal, toVal } = diff;
    return (
      <Flex
        key={JSON.stringify(diff[i]) + i}
        sx={{ flexDirection: 'column', p: 3, m: 3, bg: 'background', borderRadius: 'small' }}
      >
        <Heading variant="smallHeading">{`${contract}`}</Heading>
        <Heading variant="microHeading">{formatLocation(location)}</Heading>
        <Flex sx={{ justifyContent: 'space-between', mt: 3 }}>
          <Flex
            sx={{
              flexDirection: 'column'
            }}
          >
            <Text variant="caps">Old Value</Text>
            <Text>{fromVal}</Text>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column'
            }}
          >
            <Text variant="caps" sx={{ alignSelf: 'flex-end' }}>
              New Value
            </Text>
            <Text>{toVal}</Text>
            {formatValue(toVal).interpreted && (
              <>
                <Text variant="caps" sx={{ mt: 3, alignSelf: 'flex-end' }}>
                  Interpreted New Value
                </Text>
                <Text>{formatValue(toVal).interpreted}</Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    );
  });
};

export function SpellEffectsTab({
  proposal,
  spellData,
  spellDiffs
}: {
  proposal: Proposal;
  spellData?: SpellData;
  spellDiffs?: SpellDiffType[];
}): React.ReactElement {
  // ch401: hide until API is fixed
  // const [stateDiff, setStateDiff] = useState<SpellStateDiff>();
  // const [stateDiffError, setStateDiffError] = useState();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const url = `/api/executive/state-diff/${proposal.address}?network=${network}`;
  //       const _stateDiff = parseSpellStateDiff(await fetchJson(url));
  //       setStateDiff(_stateDiff);
  //     } catch (error) {
  //       setStateDiffError(error);
  //     }
  //   })();
  // }, []);

  /*
{stateDiff ? (
        <OnChainFx stateDiff={stateDiff} />
      ) : stateDiffError ? (
        <Flex>Unable to fetch on-chain effects at this time</Flex>
      ) : (
        <Flex sx={{ alignItems: 'center' }}>
          loading <Spinner size={20} ml={2} />
        </Flex>
      )}
  */
  const [expanded, setExpanded] = useState(false);

  return spellData ? (
    <Box>
      {spellDiffs && <SpellDiff diffs={spellDiffs} />}
      <Text
        as="p"
        variant="microHeading"
        sx={{
          mb: 4
        }}
      >
        Spell Details
      </Text>
      <Box mb={4}>
        <Text
          as="p"
          sx={{
            fontWeight: 'semiBold'
          }}
        >
          Executive Hash
        </Text>

        <Box
          sx={theme => ({
            background: theme.colors?.background,
            p: 3,
            transition: 'all 300ms linear',
            overflow: 'hidden',
            borderRadius: '3px'
          })}
        >
          <Flex
            sx={{
              justifyContent: 'space-between'
            }}
          >
            {spellData?.executiveHash && (
              <Text sx={{ mr: 2, fontWeight: 'semiBold', wordBreak: 'break-all' }}>
                {spellData?.executiveHash}
              </Text>
            )}
            <Box sx={{ cursor: 'pointer', ml: 2, minWidth: '99px' }} onClick={() => setExpanded(!expanded)}>
              <Text color={'textMuted'}>
                What&apos;s this? <DaiUIIcon name={expanded ? 'chevron_up' : 'chevron_down'} size={2} />
              </Text>
            </Box>
          </Flex>

          {expanded && (
            <Box sx={{ mt: 3 }}>
              <Text as="p" color="textMuted">
                This hash allows for manually verifying that the spell belongs to the correct Executive
                Proposal. It can be reproduced by hashing the raw markdown text of this Executive Proposal.
                The hash, the URL to the raw markdown text, and the correct hashing algorithm are all
                registered on the blockchain in the spell smart contract.
              </Text>
              <Box sx={{ mt: 3 }}>
                <ThemeUILink
                  href={'https://makerdao.world/en/learn/governance/audit-exec-spells'}
                  target="_blank"
                >
                  <Text sx={{ color: 'accentBlue', ':hover': { color: 'blueLinkHover' } }}>
                    Learn more about auditing Executive Spells
                    <DaiUIIcon ml={2} name="arrowTopRight" size="2" />
                  </Text>
                </ThemeUILink>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {'proposalLink' in proposal && (
          <Box sx={{ width: ['100%', '50%'] }}>
            <Text
              as="p"
              sx={{
                fontWeight: 'semiBold'
              }}
            >
              Proposal Markdown
            </Text>
            <Box>
              <ThemeUILink href={proposal.proposalLink} target="_blank">
                <Text sx={{ color: 'accentBlue', ':hover': { color: 'blueLinkHover' } }}>
                  View in GitHub
                  <DaiUIIcon ml={2} name="arrowTopRight" size="2" />
                </Text>
              </ThemeUILink>
            </Box>
          </Box>
        )}
        <Box sx={{ width: ['100%', '50%'] }}>
          {spellData?.expiration && (
            <Flex mb={3} mt={[3, 0]}>
              <CircleIcon name="hourglass" />
              <Box>
                <Text
                  as="p"
                  sx={{
                    fontWeight: 'semiBold'
                  }}
                >
                  Expiration
                </Text>
                <Text as="p" color="textMuted">
                  {formatDateWithoutTime(spellData?.expiration)}
                </Text>
              </Box>
            </Flex>
          )}
          {spellData?.officeHours && (
            <Flex mb={3}>
              <CircleIcon name="clock" />
              <Box>
                <Text
                  as="p"
                  sx={{
                    fontWeight: 'semiBold'
                  }}
                >
                  Office Hours Only
                </Text>
                <Text as="p" color="textMuted">
                  Spell will only be executed Monday through Friday between 14:00 and 21:00 UTC
                </Text>
              </Box>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  ) : (
    <Stack gap={3}>
      <SkeletonThemed />
      <SkeletonThemed />
      <SkeletonThemed />
    </Stack>
  );
}
