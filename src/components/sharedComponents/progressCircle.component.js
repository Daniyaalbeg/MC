import React, { useState, useEffect, useRef} from 'react';

const ProgressCircle = ({ size, progress, strokeWidth, circleStrokeBg, circleStroke, initalOffset }) => {
  const [offset, setOffset] = useState(initalOffset);
  const circleRef = useRef(null);
  
  const center = size / 2
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
    circleRef.current.style = 'transition: stroke-dashoffset 1.5s ease-in-out; box-shadow: inset 2px 2px 5px 5px red';
  }, [setOffset, circumference, progress, offset]);

  return (
    <svg className="svgProgressCircle" width={size} height={size} >
      <circle
        className="svgCircleBG"
        stroke={circleStrokeBg}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        />
      <circle
        className="svgCircle"
        stroke={circleStroke}
        cx={center}
        cy={center}
        r={radius}
        // strokeLinecap={"round"}
        ref={circleRef}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      {/* <text className="svgCircleText" x={center}  y={center}>
        {progress}
      </text> */}
    </svg>
  )
}

export default ProgressCircle