"use client";

import { Container, Title, Accordion } from '@mantine/core';
import classes from './Faq.module.css';

export default function Faq() {
  return (
    <Container size="sm" className={classes.wrapper} w="100%">
      <Title order={2} ta="center" mb={20} size="3em" c="light-dark(black, white)">
        FAQ
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>Is anyone allowed to join the marketplace?</Accordion.Control>
          <Accordion.Panel>
            No, only pharmacies registered in the Ontario College of Pharmacists would be allowed to have access. 
            We will be verifying the pharmacy license number before allowing access to the marketplace.
            </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>Can I create more that one account?</Accordion.Control>
          <Accordion.Panel>
            No, only one account per pharmacy is allowed. But once you have an account, you can add multiple users to the account.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>
            Will you handle the shipping of the products?
          </Accordion.Control>
          <Accordion.Panel>
            Due to various regulations, we will not be handling the shipping of the products. We simply connect the pharmacies together
            and the rest is up to the pharmacies to handle.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>Do you store credit card information securely?</Accordion.Control>
          <Accordion.Panel>
            All credit card information is stored securely and encrypted. We use the latest security protocols to ensure that your information is safe.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>What payment systems do you work with?</Accordion.Control>
          <Accordion.Panel>
            We use Stripe to handle all payments. Stripe is a secure and reliable payment system that is used by many companies around the world.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}