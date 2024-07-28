import { Container, ContainerProps, MantineSize } from '@mantine/core';
import React from 'react';
import classes from './CenterContainer.module.css';

interface CenterContainerProps {
  children?: React.ReactNode;
  props?: ContainerProps;
}

const CenterContainer: React.FC<CenterContainerProps> = ({ children, props }) => {
  return (
    <Container {...props} className={classes.centerContainer}>
      {children}
    </Container>
  );
};

export default CenterContainer;