import { CSSProperties } from "react";
import styled from '@emotion/styled';
import { Paper } from "@mui/material";

const useStyle = () => {
  const containerPage: CSSProperties = {
    backgroundColor: "background.paper",
    padding: "20px",
    overflow: "auto",
  };

  const Container = styled.div`
  display: flex;
`;

  const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 300px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

  const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 90vh;
`;

  const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

  const ContainerTitle = styled(Paper)`
  margin-left: 20px;
  margin-right: 20px;
  padding-top:20px;
  padding-left:20px;
  padding-right: 20px;
  margin-bottom: 20px;
`;

  const ContainerText = styled.div`
  display: flex;
  padding: 0 0 15px 0;
  gap: 20px
`;
  const ContainerBoxEmail = styled.div`
  overflow: auto;
  margin:10px;
`;

  /* const DateRangeStyle = styled(DateRange).attrs((props) => ({
    inputStyle: {
        border: `0.5px solid ${
            props.error === true
                ? props.theme.colors.red
                : props.theme.colors.primary
        }`,
    },
  }))``; */
  return {
    containerPage,
    Title,
    TaskColumnStyles,
    TaskList,
    Container,
    ContainerTitle,
    ContainerText,
    ContainerBoxEmail
  };
};

export default useStyle;
