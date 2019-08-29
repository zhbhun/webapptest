import React from 'react';
import moment from 'moment';
import { Card, Col, Icon, Row, Tooltip } from 'antd';
import { Player, BigPlayButton, ControlBar, PlaybackRateMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';
import VisualProgress from '../VisualProgress';
import styles from './index.less';

const images = [
  {
    time: 0,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 100,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 200,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 300,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 400,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 500,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 600,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
  {
    time: 700,
    screenshot:
      'https://www.webpagetest.org/thumbnail.php?test=190829_74_616dd95a266e5f1b6e6c2230dcbb9acf&fit=200&file=video_1/ms_002400.jpg',
    percent: 0,
  },
];

const VISUAL_PROGRESS =
  '0=0%, 967=10%, 1000=22%, 1033=22%, 1067=19%, 1200=19%, 1267=19%, 1300=32%, 1333=32%, 1367=32%, 1400=30%, 1500=32%, 1733=32%, 2300=42%, 2333=42%, 2367=42%, 2467=42%, 2533=42%, 2567=42%, 2600=42%, 2633=42%, 2667=42%, 2700=40%, 3300=40%, 3467=40%, 3767=41%, 4033=41%, 4233=41%, 4300=41%, 4333=41%, 4367=41%, 4500=41%, 4533=41%, 4567=41%, 4900=41%, 5500=43%, 6000=43%, 6367=43%, 6400=43%, 6433=46%, 6467=45%, 6500=46%, 6600=46%, 6633=46%, 6667=46%, 6700=46%, 6767=45%, 7167=51%, 7233=63%, 7267=63%, 7367=63%, 7400=63%, 7433=72%, 7467=78%, 7500=89%, 7533=91%, 8067=91%, 8133=91%, 8167=91%, 8200=92%, 8300=92%, 8333=92%, 8533=91%, 8567=91%, 8633=91%, 10433=91%, 10667=95%, 10700=94%, 10733=93%, 10767=93%, 10800=93%, 10833=92%, 10867=92%, 10900=92%, 10933=92%, 11033=92%, 12167=79%, 12267=79%, 12300=79%, 12467=79%, 12500=83%, 12533=83%, 12567=83%, 12600=82%, 12633=82%, 13400=100%';

const VisualMetrics = props => {
  const visitData = VISUAL_PROGRESS.split(',').reduce((rcc, item) => {
    const [time, percent] = item.split('=');
    rcc.push({
      x: Number(time),
      y: parseInt(percent) / 100,
    });
    return rcc;
  }, []);
  return (
    <Card title="Visual Metrics">
      <VisualProgress data={visitData} />
      <Player
        fluid={false}
        poster=""
        width="100%"
        height={360}
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      >
        <BigPlayButton position="center" />
        <ControlBar autoHide={false}>
          <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
        </ControlBar>
      </Player>
      <div className={styles.filmstrip}>
        {images.map(({ time, screenshot, percent }, index) => {
          return (
            <div className={styles.filmstripItem} key={index}>
              <div className={styles.filmstripItemTime}>{time}</div>
              <img className={styles.filmstripItemImage} src={screenshot} alt="screenshot" />
              <div className={styles.filmstripItemPercent}>{percent}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default VisualMetrics;
