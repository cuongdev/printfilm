import React from 'react';
import { useTranslation } from 'react-i18next';
import { STATUS_STYLES, STATUS_LABEL_KEYS } from './constants';

type Status = 'completed' | 'generating' | 'failed' | 'idle';

interface Props {
  status: Status;
  className?: string;
}

const StatusBadge: React.FC<Props> = ({ status, className = '' }) => {
  const { t } = useTranslation('prompts');
  const statusClass = STATUS_STYLES[status];
  const label = t(STATUS_LABEL_KEYS[status]);

  return (
    <span className={`text-xs px-2 py-0.5 rounded ${statusClass} ${className}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
