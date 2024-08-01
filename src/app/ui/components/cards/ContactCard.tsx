import { Card, Flex, Group, Text, Title } from '@mantine/core';
import classes from './card.module.css';
import { SelectMedicine } from '@/db/schema';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa6';


const ContactCard = ({ post }: {
  post: SelectMedicine, // Post type is not excatly same as SelectMedicine but is a subset
}) => {
  return (
    <Card miw="100%" className={classes.postCardNoHover} shadow="sm" radius="md" padding="lg" withBorder>
      <Flex direction="column" w="100%" gap={10}>
        <Title order={3}>
          Contact
        </Title>
        <Group gap={5}>
          <FaMapMarkerAlt />
          <Text>
            {post.street}, {post.city}, {post.postal}
          </Text>
        </Group>

        <Group gap={5}>
          <FaPhoneAlt />
          <Text>
            {post.phoneNumber}
          </Text>
        </Group>

        <Group gap={5}>
          <FaEnvelope />
          <Text>
            {post.email}
          </Text>
        </Group>
      </Flex>
    </Card >
  );
};

export default ContactCard;