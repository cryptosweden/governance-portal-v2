import { useState } from 'react';
import { Card, Heading, Box, Flex, Button, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import useBallotStore from '../../stores/ballot';
import useTransactionStore from '../../stores/transactions';

export default function ({ activePolls }) {
  const ballot = useBallotStore(state => state.ballot);
  const submitBallot = useBallotStore(state => state.submitBallot);
  const txObj = useBallotStore(state => state.txObj);
  const clearTx = useBallotStore(state => state.clearTx);
  const transaction = useTransactionStore(state => state.getTransaction(txObj._timeStampSubmitted));
  const ballotLength = () => {
    return Object.keys(ballot).length;
  };
  // const [ballotState, setBallotState] = useState(0);
  const [votingWeightTotal] = useState(0);

  const Default = () => (
    <Card variant="compact" p={[0, 0]}>
      <Box p={3} sx={{ borderBottom: '1px solid #D4D9E1' }}>
        <Text sx={{ color: 'onSurface', fontSize: 16, fontWeight: '500' }}>
          {`${ballotLength()} of ${activePolls.length} available polls added to ballot`}
        </Text>
        <Flex
          sx={{
            width: '100%',
            height: 2,
            backgroundColor: 'muted',
            mt: 2,
            flexDirection: 'row',
            borderRadius: 'small'
          }}
        >
          {activePolls.map((pollId, index) => (
            <Box
              key={index}
              backgroundColor="muted"
              sx={{
                flex: 1,
                borderLeft: index === 0 ? null : '1px solid white',
                borderTopLeftRadius: index === 0 ? 'small' : null,
                borderBottomLeftRadius: index === 0 ? 'small' : null,
                borderTopRightRadius: index === activePolls.length - 1 ? 'small' : null,
                borderBottomRightRadius: index === activePolls.length - 1 ? 'small' : null,
                backgroundColor: index < ballotLength() ? 'primary' : null
              }}
            />
          ))}
        </Flex>
      </Box>
      <Flex
        p={3}
        sx={{
          borderBottom: '1px solid #D4D9E1',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <Flex sx={{ flexDirection: 'row' }}>
          <Text color="onSurface">Voting weight for all polls</Text>
          <Icon name="question" ml={1} mt={1} sx={{ paddingTop: '3px' }} />
        </Flex>
        <Text>{`${votingWeightTotal.toFixed(2)} MKR`}</Text>
      </Flex>
      <Flex p={3} sx={{ flexDirection: 'column' }}>
        {/* <Flex pb={3} sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text color="onSurface">Estimated Gas Cost</Text>
          <Text>{`Gas Cost`}</Text>
        </Flex>
        <Flex pb={4} sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text color="onSurface">Estimated Confirmation Time</Text>
          <Text>{`Confirm Time`}</Text>
        </Flex>  */}
        <Flex p={3} sx={{ flexDirection: 'column' }}>
          <Button onClick={submitBallot} variant="primary" disabled={!ballotLength()} sx={{ width: '100%' }}>
            {`Submit Your Ballot (${ballotLength()} Votes)`}
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
  // const steps = [
  //   props => <Default {...props}
  // ];

  const View = () => {
    switch (transaction && transaction.status) {
      case 0:
        return <Default />;
      // Is Init
      case 'initialized':
        return (
          <Flex
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: 'white',
              border: '1px solid #D4D9E1',
              borderRadius: 'small'
            }}
          >
            <Icon name="pencil" size={5} mt={4} sx={{ paddingTop: '3px' }} />
            <Text mt={3} px={4} sx={{ textAlign: 'center', fontSize: 16, color: 'secondaryEmphasis' }}>
              Please use your [hardware, metamask, etc] wallet to sign this transaction.
            </Text>
            <Button
              mt={3}
              mb={4}
              onClick={clearTx}
              variant="textual"
              sx={{ color: 'secondaryEmphasis', fontSize: 12 }}
            >
              Cancel vote submission
            </Button>
          </Flex>
        );
      // Is Sent
      case 'pending':
        return <Box>Sent</Box>;
      // Is Completed
      case 'mined':
        return <Box>Mined</Box>;

      // Is Failed
      case 'error':
        return <Box>Failed</Box>;
      default:
        return <Default />;
    }
  };

  return (
    <Box>
      <Heading mb={3} as="h4">
        Submit Ballot
      </Heading>
      <View />
    </Box>
  );
}
