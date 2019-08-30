import React from 'react';
import { Card } from 'antd';
import { Player, BigPlayButton, ControlBar, PlaybackRateMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';
import { Browsertime } from '../../data.d';
import VisualProgress from '../VisualProgress';
import styles from './index.less';

interface VisualMetricsProps {
  browsertime: Browsertime;
  id: string;
}

const VisualMetrics: React.FC<VisualMetricsProps> = ({ browsertime, id }) => {
  const {
    files: { images },
    visualMetrics: [visualMetrics],
  } = browsertime;
  const visitData = visualMetrics.VisualProgress.split(',').reduce(
    (rcc: { x: number; y: number }[], item: string) => {
      const [time, percent] = item.split('=');
      rcc.push({
        x: Number(time),
        y: parseInt(percent) / 100,
      });
      return rcc;
    },
    [],
  );
  return (
    <Card title="Visual Metrics">
      <VisualProgress data={visitData} />
      <Player
        fluid={false}
        poster={`${location.origin}/output/test/${id}/screenshots/1.jpg`}
        width="100%"
        height={360}
        src={`${location.origin}/output/test/${id}/video/1.mp4`}
      >
        <BigPlayButton position="center" />
        <ControlBar autoHide={false}>
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
        </ControlBar>
      </Player>
      <div className={styles.filmstrip}>
        {images.map((image, index) => {
          const time = Number(image.match(/\d+/)[0]);
          let percent = '100%';
          visitData.some(({ x, y }) => {
            if (x > time) {
              return true;
            }
            percent = `${y * 100}%`;
            return false;
          })
          return (
            <div className={styles.filmstripItem} key={index}>
              <div className={styles.filmstripItemTime}>{`${(time / 1000).toFixed(3)}s`}</div>
              <img
                className={styles.filmstripItemImage}
                src={`${location.origin}/output/test/${id}/video/images/1/${image}`}
                alt="screenshot"
              />
              <div className={styles.filmstripItemPercent}>{percent}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default VisualMetrics;
