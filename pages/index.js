import { styled, useStyletron } from 'styletron-react'
import DefaultTemplate from '../components/DefaultLayout'
import { ThemeProvider, Div, Text } from "atomize";

// statically styled component
const Title = styled('h1', {
  color: 'red',
  fontSize: '82px',
})

// dynamically styled component
const SubTitle = styled('h2', ({ $size }) => ({
  color: 'blue',
  fontSize: `${$size}px`,
}))

export default function Home() {
  // an alternative hook based API
  const [css] = useStyletron()
  return (
    <DefaultTemplate>
      <Div>
        <Text textSize="display1" textColor="black" m={{l: "1rem"}}>
          About Us
        </Text>
        <Div bg="brand900" rounded="md" border="3px solid" borderColor="black">
          <Text textSize="body" textColor="black" m={{l: "1rem"}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Div>
      </Div>
    </DefaultTemplate>
  )
}