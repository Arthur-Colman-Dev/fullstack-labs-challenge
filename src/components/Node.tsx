import React, { useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";
import Status from "./Status";
import { Node as NodeType } from "../types/Node";
import { getNodeBlocks } from "../reducers/nodes";
import Block from "./Block";

type Props = {
  node: NodeType;
  expanded: boolean;
  toggleNodeExpanded: (node: NodeType) => void;
};

const AccordionRoot = styled(Accordion)({
  margin: "16px 0",
  boxShadow: "0px 3px 6px 1px rgba(0,0,0,0.15)",

  "&:before": {
    backgroundColor: "unset",
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  padding: "0 24px",
  "& .MuiAccordionSummary-content": {
    margin: "10px 0 !important", // Avoid change of sizing on expanded
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: colors.faded,
  },
});

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingRight: 20,
});

const ErrorBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  borderRadius: 2,
  backgroundColor: colors.error,
})

const EmptyBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  borderRadius: 2,
  backgroundColor: colors.primary,
})

const LoadingBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 8,
  borderRadius: 2,
  backgroundColor: colors.primary,
})

const TypographyHeading = styled(Typography)({
  fontSize: 17,
  display: "block",
  color: colors.text,
  lineHeight: 1.5,
});

const TypographySecondaryHeading = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: colors.faded,
  lineHeight: 2,
}));

const Node: React.FC<Props> = ({ node, expanded, toggleNodeExpanded }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNodeBlocks(node))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderBlock = (node: NodeType) => {
    if (node.loadingBlocks) {
      return (<LoadingBox>Loading...</LoadingBox>)
    }
    if (node.blockError) {
      return (<ErrorBox>Error loading blocks</ErrorBox>)
    }

    if (node.blocks.length === 0) {
      return (<EmptyBox>No blocks to show</EmptyBox>)
    }

    return node.blocks.map((block) => (
      <Block attributes={block.attributes} key={block.id} />
    ))
  }

  return (
    <AccordionRoot
      elevation={3}
      expanded={expanded}
      onChange={() => toggleNodeExpanded(node)}
    >
      <AccordionSummaryContainer expandIcon={<ExpandMoreIcon />}>
        <BoxSummaryContent>
          <Box>
            <TypographyHeading variant="h5">
              {node.name || "Unknown"}
            </TypographyHeading>
            <TypographySecondaryHeading variant="subtitle1">
              {node.url}
            </TypographySecondaryHeading>
          </Box>
          <Status loading={node.loading} online={node.online} />
        </BoxSummaryContent>
      </AccordionSummaryContainer>
      <AccordionDetails>
        {renderBlock(node)}
      </AccordionDetails>
    </AccordionRoot>
  );
};

export default Node;
