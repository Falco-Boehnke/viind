import styled from "styled-components";

const FlexSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

interface DataCardContainerProps {
  cols: number;
}

const DataCardContainer = styled.div<DataCardContainerProps>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.cols ? props.cols : 1)},
    1fr
  );
  place-content: center center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.5rem 1rem;
`;

const CardContent = styled.div`
  background-color: #7fffd46f;
  text-align: center;
  padding: 0 1rem 0.25rem 1rem;
  border-radius: 5px;
`;

const Title = styled.h5`
  font-size: 1rem;
`;

const Text = styled.span`
  letter-spacing: 1px;
`;

interface DataCardProps {
  cards: Array<DataCardContent>;
}

interface DataCardContent {
  content: Array<{ title: string; text: string | number }>;
}

export const DataCards = ({ cards }: DataCardProps) => {
  if (!cards || cards.length === 0) return <span>No Cards Provided</span>;

  const dataCards = cards.map((card, index) => {
    const entryCount = card.content.length;

    return (
      <DataCardContainer key={`datacard-container-${index}`} cols={entryCount}>
        {card.content.map((entry, index) => {
          return (
            <CardContent key={`datacard-${index}`}>
              <Title>{entry.title}</Title>
              <Text>{entry.text}</Text>
            </CardContent>
          );
        })}
      </DataCardContainer>
    );
  });

  return <FlexSection>{dataCards}</FlexSection>;
};
