import { ActionIcon, Card, Container, Flex, Group, Image, Text, Title } from '@mantine/core';
import classes from './landing.module.css';
import { FaEnvelope, FaLink, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const size = 250;

const MemberCard = ({
  src, alt, name, title, description,
}: {
  src: string,
  alt: string,
  name: string,
  title: string,
  description: string
}) => {
  return (
    <Card shadow="sm" radius="md" padding="lg" withBorder className={classes.card}>
      <Flex gap={25} maw={size} direction="column" justify="center" align="center">
        <Flex miw={size + "px"} maw={size + "px"} h={size + "px"} align="center" justify="center"
          style={{ borderRadius: "8px", overflow: "hidden" }}>
          <Image
            src={src} alt={alt}
            fit='scale-down' width={size} height={size} />
        </Flex>

        <Flex direction="column" w="100%">
          <Title order={3} mt={4} mb={4} c="main">
            {name}
          </Title>
          <Title order={4} mt={4} mb={4} c="dimmed">
            {title}
          </Title>
          <Text size='sm' lineClamp={4}>
            {description}
          </Text>
        </Flex>
        <Group gap={10}>
          <ActionIcon disabled variant='subtle' color='main' radius="xl" size="lg" aria-label="Website">
            <FaLink size={20} />
          </ActionIcon>
          <ActionIcon disabled variant='subtle' color='main' radius="xl" size="lg" aria-label="Email">
            <FaEnvelope size={20} />
          </ActionIcon>
          <ActionIcon disabled variant='subtle' color='main' radius="xl" size="lg" aria-label="Twitter">
            <FaTwitter size={20} />
          </ActionIcon>
          <ActionIcon disabled variant='subtle' color='main' radius="xl" size="lg" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </ActionIcon>
        </Group>
      </Flex>
    </Card>
  );
}

const membersData = [
  {
    src: "/fadi.jpeg",
    alt: "Fadi",
    name: "Fadi Alkass",
    title: "Founder & CEO",
    description: `
      A pharmacist by trade, Fadi has a passion for technology and innovation. 
      He is the driving force behind OffloadRx. 
      Knows how to spin well in Ping Pong.
    `
  },
  {
    src: "/nabil.jpg",
    alt: "Nabil",
    name: "Nabil Mansour",
    title: "Founder & CTO",
    description: `
      Nabil is a software engineer and the creator of platforms like Excalihub
      He is the technical lead at OffloadRx.
      Loves Ping Pong but is bad at it.
    `
  },
];

const Team = () => {
  return (
    <Container size="xl" w="100%" py={60}>
      <Title order={2} ta="center" size="3em" c="light-dark(black, white)">
        The Team
      </Title>
      <Container size="xs">
        <Text ta="center" size="xs" c="dimmed" mb={20}>
          Our team is focused on creating a platform that helps pharmacists and pharmacies
          manage their inventory more efficiently and effectively.
        </Text>
      </Container>

      <Group gap={25} justify='center'>
        {membersData.map((member, index) => (
          <MemberCard key={index} {...member} />
        ))}
      </Group>



    </Container>
  );
};

export default Team;
