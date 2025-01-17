import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex, NavLink, Container, Close, Box, IconButton, Divider } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

import AccountSelect from './header/AccountSelect';
import BallotStatus from 'modules/polling/components/BallotStatus';
import { useState, useEffect } from 'react';
import { useBreakpointIndex } from '@theme-ui/match-media';
import ColorModeToggle from './header/ColorModeToggle';
import NetworkSelect from './header/NetworkSelect';
import { ErrorBoundary } from '../ErrorBoundary';
import { useAccount } from 'modules/app/hooks/useAccount';

const Header = (): JSX.Element => {
  const router = useRouter();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const bpi = useBreakpointIndex();
  const { account } = useAccount();

  return (
    <Box
      as="header"
      pt={3}
      pb={[4, 5]}
      px={[2, 0]}
      variant="styles.header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}
    >
      <Link href={{ pathname: '/' }}>
        <IconButton aria-label="Maker home" sx={{ width: '40px', height: 4, p: 0 }}>
          <Icon name="maker" size="40px" color="ornament" sx={{ cursor: 'pointer' }} />
        </IconButton>
      </Link>
      <Flex sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <Link href={{ pathname: '/polling' }} passHref>
          <NavLink
            title="Polling"
            p={0}
            sx={{
              display: ['none', 'block'],
              ml: [0, 4, 'auto'],
              color: router?.asPath?.startsWith('/polling') ? 'primary' : undefined
            }}
          >
            Polling
          </NavLink>
        </Link>

        <Link href={{ pathname: '/executive' }} passHref>
          <NavLink
            p={0}
            title="Executive"
            sx={{
              display: ['none', 'block'],
              ml: [0, 4, 4, 5],
              color: router?.asPath?.startsWith('/executive') ? 'primary' : undefined
            }}
          >
            Executive
          </NavLink>
        </Link>

        <Link href={{ pathname: '/delegates' }} passHref>
          <NavLink
            title="Delegates"
            p={0}
            sx={{
              display: ['none', 'block'],
              ml: [0, 4, 4, 5],
              color: router?.asPath?.startsWith('/delegates') ? 'primary' : undefined
            }}
          >
            Delegates
          </NavLink>
        </Link>

        <Link href={{ pathname: '/esmodule' }} passHref>
          <NavLink
            title="ES Module"
            p={0}
            sx={{
              display: ['none', 'block'],
              ml: [0, 4, 4, 5],
              mr: [0, 'auto', 4, 5],
              color: router?.asPath?.startsWith('/esmodule') ? 'primary' : undefined
            }}
          >
            ES Module
          </NavLink>
        </Link>

        {bpi > 1 && (
          <Flex sx={{ pr: 2 }}>
            <ColorModeToggle />
          </Flex>
        )}

        {bpi > 3 && account && router.pathname.includes('polling') && <BallotStatus mr={3} />}
        {bpi > 1 && (
          <Flex mr={3}>
            <NetworkSelect />
          </Flex>
        )}
        {typeof window !== 'undefined' && (
          <ErrorBoundary componentName="Account Select">
            <AccountSelect />
          </ErrorBoundary>
        )}

        <IconButton
          aria-label="Show menu"
          ml="3"
          sx={{ display: [null, 'none'], height: '28px', width: '24px', p: 0 }}
          onClick={() => setShowMobileMenu(true)}
        >
          <Icon name="menu" sx={{ width: '18px' }} />
        </IconButton>
        {showMobileMenu && <MobileMenu hide={() => setShowMobileMenu(false)} router={router} />}
      </Flex>
    </Box>
  );
};

const MobileMenu = ({ hide, router }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      router.events.on('routeChangeComplete', hide);
    }
  }, []);

  return (
    <Container variant="modal">
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2
        }}
      >
        <ColorModeToggle />
        <Flex>
          <NetworkSelect />
        </Flex>
        <Close sx={{ display: ['block'], '> svg': { size: [4] } }} onClick={hide} />
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          mt: 4,
          justifyContent: 'space-between',
          height: '40vh',
          '> a': {
            fontSize: 6
          }
        }}
      >
        <Link href={{ pathname: '/' }}>
          <NavLink>Home</NavLink>
        </Link>
        <Divider sx={{ width: '100%' }} />
        <Link href={{ pathname: '/polling' }}>
          <NavLink>Polling</NavLink>
        </Link>
        <Divider sx={{ width: '100%' }} />
        <Link href={{ pathname: '/executive' }}>
          <NavLink>Executive</NavLink>
        </Link>
        <Divider sx={{ width: '100%' }} />
        <Link href={{ pathname: '/delegates' }}>
          <NavLink>Delegates</NavLink>
        </Link>
        <Divider sx={{ width: '100%' }} />
        <Link href={{ pathname: '/esmodule' }}>
          <NavLink>ES Module</NavLink>
        </Link>
      </Flex>
    </Container>
  );
};

export default Header;
