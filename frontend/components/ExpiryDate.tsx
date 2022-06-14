import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
    //   backgroundColor: '#f5f5f9',
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

const CustomButton2 = styled(Button)({
    color: "#5B321E",
    border: "2px solid #5B321E",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#FCE2A6",
      color: "#5B321E",
    },
  });

const ExpiryDate = () => {

  return (
    <div>
        <HtmlTooltip
            title={
            <React.Fragment>
                <Typography color="inherit">가공식품: 60일 이상</Typography>
                <Typography color="inherit">음 료 류 : 60일 이상</Typography>
                <Typography color="inherit">신선식품: 7일 이상</Typography>
                <Typography color="inherit">생활용품: 90일 이상</Typography>
                
            </React.Fragment>
            }
            placement="left-start"
        >
            <CustomButton2 sx={{ height: "30px", ml: 5 }}>
            유통기한 가이드
            </CustomButton2>
        </HtmlTooltip>
    </div>
  )
}
export default ExpiryDate;