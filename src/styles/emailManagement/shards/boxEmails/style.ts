import { CSSProperties } from "react";
import styled from '@emotion/styled';

const useStyle = () => {
  const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
/*   background: ${({ isDragging }: any) =>
      isDragging ? 'rgba(255, 59, 59, 0.15)' : 'white'};  */
  background: white;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 400px;
    color: #7d7d7d;
  }
`;

  const containerInfo: CSSProperties = {
    gap: "15px",
    paddingBottom: "5px"
  };

  const Container = styled.div`
  display: flex;
`;

  const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

  const TaskColumnStyles = styled.div`
  margin: 8px;
  display: inline-grid;
  width: 100%;
  min-height: 30vh;
`;

  const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;
  const ContainerBoxEmail = styled.div`

`;

  const ContainersEmail = styled.div`
display: flex;
`;


  return {
    TaskInformation,
    containerInfo,
    Container,
    Title,
    TaskColumnStyles,
    TaskList,
    ContainerBoxEmail,
    ContainersEmail
  };
};

export default useStyle;
