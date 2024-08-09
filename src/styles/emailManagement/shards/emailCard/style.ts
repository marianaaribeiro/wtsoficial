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


  return {
    TaskInformation,
    containerInfo
  };
};

export default useStyle;
