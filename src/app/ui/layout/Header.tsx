"use client";

import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Burger, Container, Drawer, Flex, Group, Text, Title } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import Link from 'next/link';
import { OffloadRx } from '../icons/custom';
import { usePathname } from 'next/navigation';

const HeaderTitle = () => {
  return <Link href="/" style={{ textDecoration: "none" }}>
    <Group ml="auto" mr="auto" className={classes.appTitle}>
      <OffloadRx size={40} aria-label="OffloadRx" />
      <Group gap={0}>
        <Title order={1}>OffloadRx</Title>
        <Text size='xs' fs="italic" style={{ alignSelf: "flex-end" }}>v0.1</Text>
      </Group>
    </Group>
  </Link>
};
const Links = ({ pathname, close }: { pathname: string, close?: () => void }) => {
  return <>
    <Link href="/" onClick={close}
      className={pathname === "/" ? classes.linkSelected : classes.link}>
      <Title order={5} c={pathname === "/" ? "main" : ""}>
        Home
      </Title>
    </Link>
    <Link href="/demo" onClick={close}
      className={pathname === "/demo" ? classes.linkSelected : classes.link}>
      <Title order={5} c={pathname === "/demo" ? "main" : ""}>
        Demo
      </Title>
    </Link>
    <Link href="/pricing" onClick={close}
      className={pathname === "/pricing" ? classes.linkSelected : classes.link}>
      <Title order={5} c={pathname === "/pricing" ? "main" : ""}>
        Pricing
      </Title>
    </Link>
  </>
};
const ActionIcons = ({ reverse = false }: { reverse?: boolean }) => {
  if (reverse) {
    return <>
      {/* <div style={{ scale: "1.25", height: "28px" }} >
        <Avatar radius="xl" size={28} />
      </div> */}
      <ThemeToggle />
    </>
  }
  return <>
    <ThemeToggle />
    {/* <div style={{ scale: "1.25", height: "28px" }} >
      <Avatar radius="xl" size={28} />
    </div> */}
  </>
};
const HeaderDrawer = ({ pathname, opened, close }:
  {
    pathname: string,
    opened: boolean,
    close: () => void
  }
) => {
  return <Drawer hiddenFrom='sm' position='right' opened={opened} onClose={close}
    title={<Group><ActionIcons reverse /></Group>}>
    <Flex direction="column" align="center" gap={25}>
      <Links pathname={pathname} close={close} />
    </Flex>
  </Drawer>
};

export function Header() {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [checkHeader, setCheckHeader] = useState(true);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const prevScrollVal = useRef(0);
  const headerHover = useHover();
  const pathname = usePathname();
  const [burgerOpened, burgerActions] = useDisclosure();
  const handleScroll = () => {
    if (window.scrollY < 350) {
      setHeaderVisible(true);
    }

    if (window.scrollY < prevScrollVal.current || window.scrollY < 350) {
      setScrollDir('up');
    } else {
      setScrollDir('down');
    }
    if (Math.abs(window.scrollY - prevScrollVal.current) > 300) {
      prevScrollVal.current = window.scrollY;
    }
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const intervalID = setTimeout(() => {
      if (scrollDir === 'down') {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      setCheckHeader(!checkHeader);
    }, 200);
    return () => clearInterval(intervalID);
  }, [checkHeader, scrollDir]);
  useEffect(() => {
    setScrollDir("up");
  }, [headerHover.hovered]);
  const slideUp = {
    transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-80%)',
    transition: "transform ease 0.25s"
  };

  return (
    <header>
      <div ref={headerHover.ref} className={classes.rootHeader}>
        <div className={classes.header} style={slideUp} >
          {/*================= Big Screen =================*/}
          <Container size="xl" className={classes.inner} visibleFrom='sm'>
            <Box w="33%">
              <HeaderTitle />
            </Box>

            <Group justify='center' gap={25} h="100%" w="33%">
              <Links pathname={pathname}  />
            </Group>

            <Group justify='right' align='center' w="33%">
              <ActionIcons />
            </Group>
          </Container>

          {/*================= Small Screen =================*/}
          <Container size="xl" className={classes.inner} hiddenFrom='sm'>
            <Box>
              <HeaderTitle />
            </Box>

            <Burger opened={burgerOpened} onClick={burgerActions.toggle} aria-label="Toggle navigation" />
            <HeaderDrawer pathname={pathname} opened={burgerOpened} close={burgerActions.close} />
          </Container>
        </div>
      </div>
    </header>
  );
}