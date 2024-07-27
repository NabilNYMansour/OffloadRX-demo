"use client";

import { useEffect, useRef, useState } from 'react';
import { Avatar, Container, Group, Skeleton, useComputedColorScheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { ThemeToggle } from '../components/buttons/ThemeToggle';
import classes from './Header.module.css';
import { SiExcalidraw } from 'react-icons/si';
import Image from 'next/image';
import Link from 'next/link';
import { faker } from '@faker-js/faker'
import { OffloadRX } from '../icons/custom';
import { FaUser } from 'react-icons/fa6';

export function Header() {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [checkHeader, setCheckHeader] = useState(true);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
  const prevScrollVal = useRef(0);
  const headerHover = useHover();

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
          <Container size="xl" className={classes.inner}>

            <Group w="33%">
              <div style={{ scale: "1.25", height: "28px" }} >
                <Avatar radius="xl" size={28} />
              </div>
            </Group>

            <Link href="/" className={classes.appTitle}>
              <Group ml="auto" mr="auto" c="main">
                <OffloadRX size={40} aria-label="OffloadRX" />
                <Group visibleFrom="sm">
                  <h1>Offload RX</h1>
                </Group>
              </Group>
            </Link>

            {/* Phone */}
            <Group justify='right' align='center' w="33%">
              <ThemeToggle />
            </Group>

          </Container>
        </div>
      </div>
    </header>
  );
}