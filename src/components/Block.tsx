import React from "react";
import {
  Typography,
  Box,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import colors from "../constants/colors";

type Props = {
  attributes: {
    data: string,
    index: number,
  }
}

const BoxSummaryContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: 8,
  backgroundColor: colors.boxBackground,
  borderRadius: 2,

  "&:nth-of-type(n + 2)": {
    marginTop: 4,
  }
});

const TypographyHeading = styled(Typography)({
  fontSize: 10,
  fontWeight: 700,
  display: "block",
  color: colors.blueText,
  lineHeight: '16px',
});

const TypographySecondaryHeading = styled(Typography)({
  fontSize: 14,
  color: colors.text,
  lineHeight: '20px',
});

const Block: React.FC<Props> = ({ attributes }) => {
  const {
    data,
    index,
  } = attributes;

  return (
    <BoxSummaryContent>
      <TypographyHeading>
        {index}
      </TypographyHeading>
      <TypographySecondaryHeading>
        {data}
      </TypographySecondaryHeading>
    </BoxSummaryContent>
  )
};

export default Block;