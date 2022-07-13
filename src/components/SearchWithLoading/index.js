import { Input, Button, Icon } from "atomize";
import React from 'react';

class SearchLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  render() {
    const { isLoading } = this.state;
    return (
      <Input
        placeholder="Loading on Search"
        suffix={
          <Button
            pos="absolute"
            onClick={() => this.setState({ isLoading: !isLoading })}
            bg="transparent"
            w="3rem"
            top="0"
            right="0"
            rounded={{ r: "md" }}
          >
            <Icon
              name={isLoading ? "Loading" : "Search"}
              color={isLoading ? "gray900" : "black"}
              size="16px"
            />
          </Button>
        }
      />
    );
  }
}

export default SearchLoading