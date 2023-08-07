import styled from "styled-components";

const StyledDiv = styled.div`
  margin-top: 1%;
  text-align: center;
`;

const NotFound = () => {
  return (
    <StyledDiv>
      Ups... acá no hay nada
      <p>
        <span className="emoji-default">🦗</span>
      </p>
    </StyledDiv>
  );
};

export default NotFound;
