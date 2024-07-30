"use client";

import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Burger, Container, Group, Skeleton, Title, useComputedColorScheme } from '@mantine/core';
import { useDisclosure, useHover } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import Link from 'next/link';
import { OffloadRx } from '../icons/custom';
import { usePathname } from 'next/navigation';

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
              <Link href="/" className={classes.appTitle}>
                <Group ml="auto" mr="auto" c="main">
                  <OffloadRx size={40} aria-label="OffloadRx" />
                  <Title order={1}>OffloadRx</Title>
                </Group>
              </Link>
            </Box>

            <Group justify='center' gap={25} h="100%" w="33%">
              <Link href="/"
                className={pathname === "/" ? classes.linkSelected : classes.link}>
                <Title order={5} c={pathname === "/" ? "main" : ""}>
                  Home
                </Title>
              </Link>
              <Link href="/demo"
                className={pathname === "/demo" ? classes.linkSelected : classes.link}>
                <Title order={5} c={pathname === "/demo" ? "main" : ""}>
                  Demo
                </Title>
              </Link>
              <Link href="/about"
                className={pathname === "/about" ? classes.linkSelected : classes.link}>
                <Title order={5} c={pathname === "/about" ? "main" : ""}>
                  About
                </Title>
              </Link>
            </Group>

            <Group justify='right' align='center' w="33%">
              <ThemeToggle />
              <div style={{ scale: "1.25", height: "28px" }} >
                <Avatar radius="xl" size={28} />
              </div>
            </Group>
          </Container>
          {/*================= Small Screen =================*/}
          <Container size="xl" className={classes.inner} hiddenFrom='sm'>
            <Box w="33%">
              <Link href="/" className={classes.appTitle}>
                <Group ml="auto" mr="auto" c="main">
                  <OffloadRx size={40} aria-label="OffloadRx" />
                </Group>
              </Link>
            </Box>

            <Burger opened={burgerOpened} onClick={burgerActions.toggle} aria-label="Toggle navigation" />
          </Container>
        </div>
      </div>
    </header>
  );
}