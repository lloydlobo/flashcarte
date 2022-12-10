import {
  Button,
  Center,
  Container,
  createStyles,
  Text,
  Title,
} from '@mantine/core';
import { ReactNode } from 'react';

import { getYearMonthDay } from '../../../utils/get-year-month-day.utils';
import { Dots } from '../Dots';

export function HeroSection({ children }: { children: ReactNode }) {
  const { classes } = useStylesHeroText();
  const { day, month, year } = getYearMonthDay();
  const dayString = Number(day);

  /** @see https://stackoverflow.com/a/62510681 */
  let suffix =
    (dayString >= 4 && dayString <= 20) || (dayString >= 24 && dayString <= 30)
      ? 'th'
      : ['st', 'nd', 'rd'][(dayString % 10) - 1];

  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

      <div className={classes.inner}>
        <Center>
          <Title className={classes.title}>
            {month}{' '}
            <Text
              component="span"
              className={`${classes.highlight}  text-black`}
              inherit
            >
              {`${day}${suffix}`}
            </Text>
            {', '}
            {year}{' '}
          </Title>
        </Center>
        {children}

        <Container p={0} size={600}>
          <Text hidden size="lg" color="dimmed" className={classes.description}>
            Build more reliable software with AI companion. AI is also trained
            to detect lazy developers who do nothing and just complain on
            Twitter.
          </Text>
        </Container>

        <div hidden className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            Book a demo
          </Button>
          <Button className={classes.control} size="lg">
            Purchase a license
          </Button>
        </div>
      </div>
    </Container>
  );
}

const useStylesHeroText = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 120 / 3,
    paddingBottom: 80 / 2,

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    // color:
    //   theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
    backgroundImage: theme.fn.gradient({
      from: theme.fn.rgba(theme.colors.blue[9], 0.98),
      to: theme.fn.rgba(theme.colors.cyan[3], 0.8),
      deg: 90,
    }),
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '100% 200%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));
