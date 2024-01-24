import React from "react";
import TimeLine from "@mui/lab/Timeline";
import TimeLineItem from "@mui/lab/TimelineItem";
import TimeLineSeperator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimeLineContent from "@mui/lab/TimelineContent";
import TimeLineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimeLineDot from "@mui/lab/TimelineDot";
import { Event } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

const CustomTimeLine = ({ timeLine = [] }) => {
  return (
    <div>
      <TimeLine position="alternate">
        {timeLine.map((item, index) => (
          <TimeLineItem key={index}>
            <TimeLineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
            >
              {item.date.toString().split("T")[0]}
            </TimeLineOppositeContent>
            <TimeLineSeperator>
              <TimelineConnector />
              <TimeLineDot>
                <Event />
              </TimeLineDot>
            </TimeLineSeperator>
            <TimeLineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>{item.description}</Typography>
            </TimeLineContent>
          </TimeLineItem>
        ))}
      </TimeLine>
    </div>
  );
};

export default CustomTimeLine;
