// import { useRef } from 'react';
//
// interface IUseZoomProps {
//   scaleRef: React.MutableRefObject<number>;
//   viewPosRef: React.MutableRefObject<{ x: number; y: number }>;
//   draw: () => void;
//   stepScales: number[];
//   initialZoomIndex: number;
// }
//
// export const useZoom = (props: IUseZoomProps) => {
//   const zoomIndexRef = useRef(props.initialZoomIndex);
//   const MIN_SCALE_INDEX = 0;
//   const MAX_SCALE_INDEX = props.stepScales.length - 1;
//
//   const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
//     const viewPos = props.viewPosRef;
//     const scale = props.scaleRef;
//
//     if (!viewPos || scale.current === null) return;
//
//     e.preventDefault();
//     const { offsetX, offsetY } = e.nativeEvent;
//
//     if (e.deltaY < 0 && zoomIndexRef.current > MIN_SCALE_INDEX) {
//       zoomIndexRef.current -= 1;
//     } else if (e.deltaY > 0 && zoomIndexRef.current < MAX_SCALE_INDEX) {
//       zoomIndexRef.current += 1;
//     }
//
//     const newScale =
//       props.stepScales[props.initialZoomIndex] / props.stepScales[zoomIndexRef.current];
//     const xs = (offsetX - viewPos.current.x) / scale.current;
//     const ys = (offsetY - viewPos.current.y) / scale.current;
//
//     scale.current = newScale;
//     viewPos.current = {
//       x: offsetX - xs * scale.current,
//       y: offsetY - ys * scale.current,
//     };
//
//     props.draw();
//   };
//
//   return { handleWheel, zoomIndexRef };
// };
