import React from 'react';
import { useTranslation } from 'react-i18next';
import { Film } from 'lucide-react';
import { Shot } from '../../types';
import { STYLES } from './constants';

interface Props {
  shots: Shot[];
}

const TimelineVisualizer: React.FC<Props> = ({ shots }) => {
  const { t } = useTranslation('export');
  return (
    <div className="mb-10">
      <div className="flex justify-between text-[10px] text-zinc-600 font-mono uppercase tracking-widest mb-2 px-1">
        <span>{t('timeline.label')}</span>
        <span>TC 00:00:00:00</span>
      </div>
      <div className={STYLES.timeline.container}>
        {shots.length === 0 ? (
          <div className="w-full flex items-center justify-center text-zinc-800 text-xs font-mono uppercase tracking-widest">
            <Film className="w-4 h-4 mr-2" />
            {t('timeline.noShots')}
          </div>
        ) : (
          shots.map((shot, idx) => {
            const isDone = !!shot.interval?.videoUrl;
            return (
              <div
                key={shot.id}
                className={`${STYLES.timeline.segment} ${
                  isDone ? STYLES.timeline.segmentComplete : STYLES.timeline.segmentIncomplete
                }`}
                title={t('timeline.shotTooltip', { number: idx + 1, summary: shot.actionSummary })}
              >
                {isDone && <div className="h-full w-full bg-cyan-300/20"></div>}

                <div className={STYLES.timeline.tooltip}>
                  <div className="bg-black text-white text-[10px] px-2 py-1 rounded border border-zinc-700 shadow-xl">
                    {t('timeline.shot', { number: idx + 1 })}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TimelineVisualizer;
